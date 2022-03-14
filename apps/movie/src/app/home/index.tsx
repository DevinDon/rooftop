import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const TailwindList = tw.ul`
  flex flex-col
  gap-2
`;

const TailwindListItem = tw(Link)`
  flex flex-row
  px-4 py-2
  hover:bg-gray-200 transition-colors
`;

export type Metadata = {
  source: string;
  title: string;
  m3u8: string;
  md5: string;
};

export const HomePage = () => {

  const [ list, setList ] = useState<Metadata[]>([]);

  useEffect(() => {
    fetch('api/movies')
      .then(response => response.json())
      .then((json: Metadata[]) => setList(json));
  }, []);

  return <TailwindList>
    {
      list
        .map(
          metadata => {
            const link = `${metadata.md5}/${metadata.m3u8}`;
            const { title } = metadata;
            return <TailwindListItem key={link} to={`/play/${btoa(link)}`}>
              {title}
            </TailwindListItem>;
          },
        )
    }
  </TailwindList>;

};

export default HomePage;
