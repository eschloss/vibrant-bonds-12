export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || (navigator as any).vendor || "";
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOS13Plus = navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1;
  return iOS || iPadOS13Plus;
}


