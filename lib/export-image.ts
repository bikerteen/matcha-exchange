/**
 * Renders a DOM node to a PNG entirely in the browser. Nothing is uploaded.
 */
export interface ExportOptions {
  /** Output width in pixels. Height follows the node's aspect ratio. */
  targetWidth?: number;
  fileName: string;
  backgroundColor?: string;
}

export type ExportResult = "shared" | "downloaded";

export async function exportNodeAsPng(node: HTMLElement, options: ExportOptions): Promise<ExportResult> {
  const { toBlob } = await import("html-to-image");
  const width = node.offsetWidth || 1;
  const pixelRatio = (options.targetWidth ?? 1080) / width;
  const renderOptions = {
    pixelRatio,
    cacheBust: true,
    backgroundColor: options.backgroundColor,
    filter: (element: HTMLElement) => !element.dataset?.exportIgnore,
  };

  // Safari sometimes paints web fonts only on the second pass.
  await toBlob(node, renderOptions);
  const blob = await toBlob(node, renderOptions);
  if (!blob) throw new Error("Could not render image");

  const file = new File([blob], options.fileName, { type: "image/png" });
  const canShareFiles =
    typeof navigator !== "undefined" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] }) &&
    window.matchMedia("(pointer: coarse)").matches;

  if (canShareFiles) {
    try {
      await navigator.share({ files: [file], title: "LMX Certificate of Matcha Ownership" });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "shared";
      // Fall through to a plain download.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = options.fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "downloaded";
}
