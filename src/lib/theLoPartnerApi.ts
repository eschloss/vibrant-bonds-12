import { EVENTS_API_BASE_URL } from "@/lib/eventApi";
import { executeRecaptchaV3 } from "@/lib/recaptchaLoader";
import { shardApiUrl } from "@/lib/urlShard";

const ADD_MEMBER_PATH = "/community_partners/add_member/";

function getPartnerEnv(): { communityId: number | string; characterPublicKey: string } | null {
  const rawId = import.meta.env.VITE_THE_LO_PARTNER_COMMUNITY_ID?.trim();
  const key = import.meta.env.VITE_THE_LO_PARTNER_CHARACTER_PUBLIC_KEY?.trim();
  if (!rawId || !key) return null;
  const n = Number(rawId);
  return {
    communityId: Number.isFinite(n) ? n : rawId,
    characterPublicKey: key,
  };
}

function addMemberUrl(): string {
  return shardApiUrl(`${EVENTS_API_BASE_URL}${ADD_MEMBER_PATH}`);
}

/** POST /community_partners/add_member/ — reCAPTCHA + partner secret; 200/201 = success. */
export async function submitTheLoPartnerMember(email: string): Promise<void> {
  const config = getPartnerEnv();
  if (!config) {
    throw new Error("Partner signup is not configured for this page.");
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
      community_id: config.communityId,
      character_public_key: config.characterPublicKey,
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
