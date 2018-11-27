import jobs from './tables/jobs';
import jobEvents from './tables/jobEvents';

export default function build(eventDataQueries = []) {
  const schema = {
    tables: [
      jobs,
    ],
    connections: [],
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
