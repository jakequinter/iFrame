import algoliasearch from 'algoliasearch/lite';
import { initAlgolia } from '../../src/utils/initAlgolia';
import Occurrences from '../../src/components/Occurrences';

export default function IFrame({ hits }) {
  return (
    <div>
      <Occurrences hits={hits} />
    </div>
  );
}

export async function getStaticPaths() {
  const hits = await initAlgolia();

  const paths = hits.map(hit => ({
    params: { id: hit.instructor.userId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const hits = await initAlgolia();

  const instructorHits = hits.filter(
    h => h.instructor.userId === context.params.id
  );

  return {
    props: {
      hits: instructorHits,
    },
  };
}
