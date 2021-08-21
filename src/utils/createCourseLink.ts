import * as _slugify from "slugify";

const TRAINING_URL =
  process.env.NEXT_PUBLIC_TRAINING_URL ||
  "https://training.usconcealedcarry.com";

type Props = {
  name: string,
  id: string,
};

export type createCourseLinkDef = (
  props: Props,
  slugify?: (input: string) => string
) => string;

export const createCourseLink: createCourseLinkDef = (
  { name, id }: Props, // @ts-ignore
  slugify = _slugify 
): string => {
  const slug = slugify(name.toLowerCase());
  return `${TRAINING_URL}/class/${slug}/${id}`;
};