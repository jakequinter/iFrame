# [Delta Defense iFrame](https://iframe-next-js.vercel.app/)

An embeddable iFrame developed for curriculum, organizations, and instructors to utilize on their webpages.

Below is a production image of the iFrame being embedded on an Unbounce page.

![iFrame](https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/10916/VApoKo25icbKvdLptBJ7GdGNQve2aoFMJ0rkTiqZ.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBUaDGV1LWNlbnRyYWwtMSJHMEUCIQDlyBjOgs7H5gjEEqiTgcGbK7Y%2BI2ExvXyEtzrwlYqYDQIgQ1gMIxjERG8Ly%2BGd88niU0nzQCjzSwEC%2BtLDUGN4foMqnwIIThAAGgw5MTk1MTQ0OTE2NzQiDF%2B8%2BdZ%2Bx8KV7slALSr8AdwjTvC8dIMIQa7ZS4%2BL8GrLHHS79JFdBrfaJQNP%2BhoeAUowtQQdsTlbujTRO0A9urhI0%2BKNG6AE42YW7FmMV5gV8G%2FXkZ2KUl4%2Fl8k%2FskaD8nUy7ZwLhYYxFTeX%2FdukFXueF2cVJFiWix0pM4CykYCeCxdxCe4VCcUCOx1WZq8I%2FCEbtfW7ZVB2DomsB2J4j4mmr12rICCbJIIRLQN%2BbYYLJVSAJIe77RI%2BKWm%2Fn93VSrA3bfeTAMmdgTu3zeO6NMrKvgvtjnU7pukG9ctbYgZok5V6D2RFYubLLxelw4xJpOoH9znbMb5DDOSJNayfIaj75u0iSRzfqT8aKjCI0JqJBjqaAZKJzkEdAV27ZVXNVJAI%2BDHv78mGYZQM5gsznkT%2BDEWNwLK03NAV69k4gyeSuR6M2Y15wkB3yzmn0%2BJ39KBfXWc1ct%2FYAPSmV1llv0rzxrbLGWsZR4OUi6A8BrrUNltlKfg%2FIj0uyAiJSOJniZ29YDPC%2FWukMIQ3bVnCrxOiAyBNk6XkLrXu3zVOLc%2Bd9wrLAI00%2FXMsGT4797I%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNJJRWE765%2F20210825%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210825T211518Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=0796c099120986f53add53888eba90cf80be04e7f6e3476e80027159119be655)

### Overview

- `pages/iframe/[type]/[id]`: This is a dynamic route filtering on an Algoli indices. `[type]` corresponds to `curriculum`, `organization`, or `instructor`, and `[id]` is the respective Algolia filter.

### Running Locally

```
$ git clone git@github.com:jakequinter/iframe-next.js.git
$ cd iframe-next.js
$ yarn
$ yarn dev
```

Create a `.env.local` file similar to what is posted below:

```
NEXT_PUBLIC_TRAINING_URL=
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=
NEXT_PUBLIC_ALGOLIA_PLACES_APP_ID=
NEXT_PUBLIC_ALGOLIA_PLACES_PUBLIC_KEY=
NEXT_PUBLIC_ALGOLIA_OCCURRENCES_INDEX=
```

### Built With

- [Vercel](https://vercel.com/)
- [Next.js](https://nextjs.org/)
- [Algolia](https://www.algolia.com/)
- [Sass](https://sass-lang.com/)

### View in Production

- [FL-CCHDF](https://www.usconcealedcarry.com/uscca-info/product/florida-license-to-carry-course/)
- [TX-CCHDF](https://www.usconcealedcarry.com/uscca-info/product/texas-license-to-carry-course/)
