import jobs from './tables/jobs';
import jobEvents from './tables/jobEvents';

const connection = {
  alias: 'joined job with job events',
  tables: [
    { id: 'jobEvents', alias: 'jobEvents' },
    { id: 'jobs', alias: 'jobs' },
  ],
  joins: [
    {
      left: { tableAlias: 'jobs', columnId: 'id' },
      right: { tableAlias: 'jobEvents', columnId: 'job' },
      joinType: 'left',
    },
  ],
};

export default function build(eventDataQueries = []) {
  const schema = {
    tables: [
      jobs,
    ],
    connections: [connection],
  };

  const eventDataColumns = eventDataQueries.reduce((accumulator, { name, role, type }) => {
    const column = {
      id: name,
      alias: name,
      dataType: type,
    };

    if (role !== 'default') {
      column.role = role;
    }

    return accumulator.concat(column);
  }, []);

  jobEvents.columns.push(...eventDataColumns);

  schema.tables.push(jobEvents);

  return schema;
}
