export default {
  alias: 'jobEvents',
  id: 'jobEvents',
  incrementColumnId: 'id',
  description: 'A job is an instance of an Ansible playbook run, inventory sync, or project sync.',
  columns: [
    {
      id: 'id',
      alias: 'id',
      dataType: 'int',
      columnRole: 'dimension',
      description: 'Database ID for this job event. (integer)',
    },
    {
      id: 'type',
      alias: 'type',
      dataType: 'string',
      columnRole: 'dimension',
      description: 'Data type for this job event. (choice)',
    },
    {
      id: 'url',
      alias: 'url',
      dataType: 'string',
      description: 'URL for this job event. (string)',
    },
    {
      id: 'created',
      alias: 'created',
      dataType: 'datetime',
      description: 'Timestamp when this job event was created. (datetime)',
    },
    {
      id: 'modified',
      alias: 'modified',
      dataType: 'datetime',
      description: 'Timestamp when this job event was last modified. (datetime)',
    },
    {
      id: 'job',
      alias: 'job',
      dataType: 'int',
      columnRole: 'dimension',
      description: 'ID of the job that created this event. (field)',
    },
    {
      id: 'event',
      alias: 'event',
      dataType: 'string',
      columnRole: 'dimension',
      description: 'runner_on_failed / runner_on_ok / runner_on_error / runner_on_skipped / runner_on_unreachable / runner_on_no_hosts / runner_on_async_poll / runner_on_async_ok / runner_on_async_failed / runner_item_on_ok / runner_item_on_failed / runner_item_on_skipped / runner_retry / runner_on_file_diff / playbook_on_start / playbook_on_notify / playbook_on_include / playbook_on_no_hosts_matched / playbook_on_no_hosts_remaining / playbook_on_task_start / playbook_on_vars_prompt / playbook_on_setup / playbook_on_import_for_host / playbook_on_not_import_for_host / playbook_on_play_start / playbook_on_stats / debug / verbose / deprecated / warning / system_warning / error',
    },
    {
      id: 'counter',
      alias: 'counter',
      dataType: 'int',
      columnRole: 'measure',
      description: '(integer)',
    },
    {
      id: 'event_display',
      alias: 'event_display',
      dataType: 'string',
      description: '(string)',
    },
    {
      id: 'event_level',
      alias: 'event_level',
      dataType: 'int',
      columnRole: 'dimension',
      description: '(integer)',
    },
    {
      id: 'failed',
      alias: 'failed',
      dataType: 'bool',
      columnRole: 'dimension',
      description: '(boolean)',
    },
    {
      id: 'changed',
      alias: 'changed',
      dataType: 'bool',
      columnRole: 'dimension',
      description: '(boolean)',
    },
    {
      id: 'uuid',
      alias: 'uuid',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(string)',
    },
    {
      id: 'parent_uuid',
      alias: 'parent_uuid',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(string)',
    },
    {
      id: 'host',
      alias: 'host',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(field)',
    },
    {
      id: 'host_name',
      alias: 'host_name',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(string)',
    },
    {
      id: 'parent',
      alias: 'parent',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(field)',
    },
    {
      id: 'playbook',
      alias: 'playbook',
      dataType: 'string',
      columnRole: 'dimension',
      description: 'Path to the playbook relative to the project root. (string)',
    },
    {
      id: 'play',
      alias: 'play',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(string)',
    },
    {
      id: 'task',
      alias: 'task',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(string)',
    },
    {
      id: 'role',
      alias: 'role',
      dataType: 'string',
      columnRole: 'dimension',
      description: '(string)',
    },
    {
      id: 'stdout',
      alias: 'stdout',
      dataType: 'string',
      description: '(string)',
    },
    {
      id: 'start_line',
      alias: 'start_line',
      dataType: 'int',
      description: '(integer)',
    },
    {
      id: 'end_line',
      alias: 'end_line',
      dataType: 'int',
      description: '(integer)',
    },
  ],
};
