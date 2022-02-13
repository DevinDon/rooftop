declare module 'node-m3u8-to-mp4' {

  export type ParsedItem = {
    url: string;
    isFull: boolean;
  };

  export async function mParser(path: string): Promise<ParsedItem[]>;

  export async function mDownloader(urls: ParsedItem['url'][], options?: { targetPath: string = '.tmp'; headers?: Record<string, string>; }): Promise<void>;

  export async function mConverter(temporaryPath: string, storagePath: string, cleanTemporaryDir: boolean = true): Promise<void>;

  export async function mIndicator(event: 'downloading' | 'converting', callback: (progress: number, total: number) => void): void;

}
