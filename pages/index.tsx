import React from 'react';
import Link from 'next/link';
import { server } from '../config';
import { getSlug } from '../utils/helpFunctions';

import TripGallery from '../components/TripGallery/TripGallery';
import ReviewGallery from '../components/ReviewGallery/ReviewGallery';

import styles from './HomePage.module.scss';
import buttonStyles from '../styles/buttons.module.scss';

import { ArticleEntry } from '../types';

interface HomePageProps {
  articleEntry: ArticleEntry;
}

const HomePage = ({ articleEntry }: HomePageProps) => {
  return (
    <>
      <article className={styles.heroWrapper}>
        <div className={styles.logoWrapper}>
          <h1>Friendly Travel</h1>
          <img src="/logo.svg" alt="logo" />
        </div>
        <p>Travel solo, not alone</p>
      </article>

      <article className={styles.infoWrapper}>
        <h2>Ready for an Adventure?</h2>
        <p>
          We've got you! A lot of people wants to travel but has no one to accompany them. While
          traveling alone is always thrilling, it has its downsides as well. Enter Friendly Travel,
          where you can join a group of likeminded travelers for great experiences and new friends.
        </p>

        <Link href="/trips/">
          <a className={buttonStyles.primaryButton}>Let's go!</a>
        </Link>
      </article>

      <TripGallery />

      {articleEntry && (
        <article className={styles.articleWrapper}>
          <img src={articleEntry.imageUrl} />
          <div className={styles.textWrapper}>
            <h2>{articleEntry.title}</h2>
            <p>{articleEntry.description}</p>
            <Link href={`/article/${getSlug(articleEntry.title)}`}>
              <a className={buttonStyles.primaryButton}>Read more</a>
            </Link>
          </div>
        </article>
      )}

      <ReviewGallery />
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/articles/?limit=1`);
  const data = await res.json();
  const props: HomePageProps = { articleEntry: data[0] };
  return { props };
}

export default HomePage;
