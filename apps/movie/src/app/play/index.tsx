import Danmaku from '@nplayer/danmaku';
import NPlayer from '@nplayer/react';
import Hls from 'hls.js';
import type { Player } from 'nplayer';
import { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

export const PlayPage = () => {

  const { params } = useRouteMatch < { id: string }>();

  const hls = new Hls();
  const ref = useRef() as React.MutableRefObject<Player>;

  useEffect(() => {
    hls.attachMedia(ref.current.video);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(`http://localhost:8080/movies/${atob(params.id)}`);
    });
  }, []);

  return <div>
    <NPlayer
      ref={ref}
      options={{
        bpControls: {
          650: [
            [ 'play', 'progress', 'time', 'web-fullscreen', 'fullscreen' ],
            [],
            [ 'airplay', 'danmaku-send', 'danmaku-settings', 'settings' ],
          ],
        },
        controls: [
          [ 'play', 'volume', 'time', 'danmaku-send', 'danmaku-settings', 'airplay', 'settings', 'web-fullscreen', 'fullscreen' ],
          [ 'progress' ],
        ],
        plugins: [
          new Danmaku({ autoInsert: false }),
        ],
      }}
    />
  </div>;

};

export default PlayPage;
