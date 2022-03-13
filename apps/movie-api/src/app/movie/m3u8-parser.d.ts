/* eslint-disable @typescript-eslint/naming-convention */
declare module 'm3u8-parser' {

  export type Manifest = {
    allowCache: boolean;
    endList: boolean;
    mediaSequence: number;
    discontinuitySequence: number;
    playlistType: string;
    custom: Record<never, never>;
    playlists: [
      {
        attributes: Record<never, never>;
        Manifest;
      },
    ];
    mediaGroups: {
      AUDIO: {
        'GROUP-ID': {
          NAME: {
            default: boolean;
            autoselect: boolean;
            language: string;
            uri: string;
            instreamId: string;
            characteristics: string;
            forced: boolean;
          };
        };
      };
      VIDEO: Record<never, never>;
      'CLOSED-CAPTIONS': Record<never, never>;
      SUBTITLES: Record<never, never>;
    };
    dateTimeString: string;
    dateTimeObject: Date;
    targetDuration: number;
    totalDuration: number;
    discontinuityStarts: [number];
    segments: [
      {
        byterange: {
          length: number;
          offset: number;
        };
        duration: number;
        attributes: Record<never, never>;
        discontinuity: number;
        uri: string;
        timeline: number;
        key: {
          method: string;
          uri: string;
          iv: string;
        };
        map: {
          uri: string;
          byterange: {
            length: number;
            offset: number;
          };
        };
        'cue-out': string;
        'cue-out-cont': string;
        'cue-in': string;
        custom: Record<never, never>;
      },
    ];
  };

  export class Parser {

    manifest: Manifest;

    push(content: string): void;

    end(): void;

  }

}
