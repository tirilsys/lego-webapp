import { Link } from 'react-router-dom';
import { Flex } from 'app/components/Layout';
import Time from 'app/components/Time';
import styles from './GalleryDetailsRow.css';

type Props = {
  gallery: Record<string, any>;
  showDescription?: boolean;
  size?: 'small' | 'large';
};

const GalleryDetailsRow = ({
  gallery,
  showDescription = false,
  size = 'large',
}: Props) => (
  <Flex className={styles.details} column>
    <div
      className={size === 'small' ? styles.smallDetails : styles.largeDetails}
    >
      {gallery.event && (
        <span className={styles.detail}>
          <Link to={`/events/${gallery.event.id}`}>{gallery.event.title}</Link>
        </span>
      )}

      {gallery.takenAt && (
        <span className={styles.detail}>
          <Time time={gallery.takenAt} format="DD.MM.YYYY" />
        </span>
      )}

      {gallery.location && (
        <span className={styles.detail}>{gallery.location}</span>
      )}
    </div>

    {showDescription && (
      <p className={styles.description}>{gallery.description}</p>
    )}
  </Flex>
);

export default GalleryDetailsRow;
