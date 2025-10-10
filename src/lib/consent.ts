export type ConsentCategories = {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  performance: boolean;
};

const STORAGE_KEY = "pulse_cookie_consent_v1";

const defaultConsent: ConsentCategories = {
  essential: true,
  analytics: false,
  marketing: false,
  performance: false,
};

export function getStoredConsent(): ConsentCategories | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      ...defaultConsent,
      ...parsed,
      essential: true,
    } as ConsentCategories;
  } catch {
    return null;
  }
}

export function getConsent(): ConsentCategories {
  return getStoredConsent() ?? { ...defaultConsent };
}

export function hasUserSetConsent(): boolean {
  return !!localStorage.getItem(STORAGE_KEY);
}

export function setConsent(update: Partial<ConsentCategories>): ConsentCategories {
  const merged = { ...getConsent(), ...update, essential: true };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  // Notify listeners
  try {
    window.dispatchEvent(new CustomEvent("pulseConsentChanged", { detail: merged }));
  } catch {
    // no-op
  }
  return merged;
}

export function acceptAll(): ConsentCategories {
  return setConsent({ analytics: true, marketing: true, performance: true });
}

export function rejectNonEssential(): ConsentCategories {
  return setConsent({ analytics: false, marketing: false, performance: false });
}


