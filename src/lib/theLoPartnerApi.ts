import { EVENTS_API_BASE_URL } from "@/lib/eventApi";
import { executeRecaptchaV3 } from "@/lib/recaptchaLoader";
import { shardApiUrl } from "@/lib/urlShard";

const ADD_MEMBER_PATH = "/community_partners/add_member/";

function getCommunityId(): number | string | null {
  const rawId = import.meta.env.VITE_THE_LO_PARTNER_COMMUNITY_ID?.trim();
  if (!rawId) return null;
  const n = Number(rawId);
  return Number.isFinite(n) ? n : rawId;
}

function addMemberUrl(): string {
  return shardApiUrl(`${EVENTS_API_BASE_URL}${ADD_MEMBER_PATH}`);
}

/** POST /community_partners/add_member/ — reCAPTCHA; `characterPublicKey` from partner link (?key=). */
export async function submitTheLoPartnerMember(email: string, characterPublicKey: string): Promise<void> {
  const communityId = getCommunityId();
  const key = characterPublicKey.trim();
  if (!communityId) {
    throw new Error("Partner signup is not configured for this page.");
  }
  if (!key) {
    throw new Error("Open this page from your partner link (missing key).");
  }

  const normalizedEmail = email.trim().toLowerCase();

  let token: string;
  try {
    token = await executeRecaptchaV3("the_lo_partner_member");
  } catch {
    throw new Error("Security check failed. Please refresh and try again.");
  }

  const response = await fetch(addMemberUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      community_id: communityId,
      character_public_key: key,
      email: normalizedEmail,
      recaptcha: token,
      extra_info: {
        source: "the-lo",
      },
    }),
  });

  if (response.status === 200 || response.status === 201) {
    return;
  }

  let message = "Unable to continue. Please try again.";
  try {
    const body = (await response.json()) as { error?: string };
    if (typeof body?.error === "string" && body.error.trim()) {
      message = body.error.trim();
    }
  } catch {
    // ignore
  }

  if (response.status === 429) {
    message = "Too many attempts. Please wait a minute and try again.";
  }

  throw new Error(message);
}
