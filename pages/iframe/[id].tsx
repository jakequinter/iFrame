import { GetServerSideProps } from 'next';

import { Hit } from '../../src/types/algolia/hits';
import { initAlgolia } from '../../src/utils/initAlgolia';
import Occurrences from '../../src/components/Occurrences';

type IFrame = {
  hits: Array<Hit>;
};

export default function IFrame({ hits }: IFrame) {
  console.log(hits);
  return (
    <div>
      <Occurrences hits={hits} />
    </div>
  );
}

export async function getStaticPaths() {
  const hits = await initAlgolia();

  const paths = hits.map(hit => ({
    // @ts-ignore
    params: { id: hit.instructor.userId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getServerSideProps: GetServerSideProps = async context => {
  const hits = await initAlgolia();

  const instructorHits = hits.filter(
    // @ts-ignore
    h => h.instructor.userId === context.params?.id
  );

  return {
    props: {
      hits: instructorHits,
    },
  };
};
