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
  url: string;
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
      list.map(
        metadata => <TailwindListItem key={metadata.url} to={`/play/${btoa(metadata.url)}`}>
          {metadata.title}
        </TailwindListItem>,
      )
    }
  </TailwindList>;

};

export default HomePage;
