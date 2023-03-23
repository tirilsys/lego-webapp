import moment from 'moment';
import { Link } from 'react-router-dom';
import { Image } from 'app/components/Image';
import { jobType, Year, Workplaces } from 'app/components/JoblistingItem/Items';
import { Flex } from 'app/components/Layout';
import Tag from 'app/components/Tags/Tag';
import Time from 'app/components/Time';
import type { ListJoblisting } from 'app/store/models/Joblisting';
import styles from './JoblistingItem.css';

type JobListingItemProps = {
  joblisting: ListJoblisting;
};

const JoblistingItem = ({ joblisting }: JobListingItemProps) => (
  <Link to={`/joblistings/${joblisting.id}/`} className={styles.joblistingItem}>
    {joblisting.company.logo && (
      <Image
        className={styles.companyLogo}
        src={joblisting.company.logo}
        placeholder={joblisting.company.logoPlaceholder}
        alt={`${joblisting.company.name} logo`}
      />
    )}
    <div className={styles.listItem}>
      <div>
        <Flex wrap gap={4}>
          {moment(joblisting.createdAt).isAfter(
            moment().subtract(3, 'days')
          ) && <Tag tag="Ny" color="green" />}
          <h3 className={styles.joblistingItemTitle}>{joblisting.title}</h3>
        </Flex>
        <div>
          {joblisting.company.name}
          {joblisting.jobType && (
            <>
              <span> • </span>
              {jobType(joblisting.jobType)}
            </>
          )}
        </div>
        <div>
          <Year joblisting={joblisting} />
          {joblisting.workplaces && (
            <>
              <span> • </span>
              <Workplaces places={joblisting.workplaces} />
            </>
          )}
        </div>
      </div>
      <Time
        time={joblisting.deadline}
        style={{
          width: '135px',
        }}
        format="ll HH:mm"
        className={styles.deadLine}
      />
    </div>
  </Link>
);

export default JoblistingItem;
