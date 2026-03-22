export function DownloadForm({ formId }: { formId?: string }) {
  return (
    <form aria-label="download-form">
      <input type="hidden" name="form-id" value={formId ?? "internal-default"} />
      <button type="submit">資料をダウンロード</button>
    </form>
  );
}
