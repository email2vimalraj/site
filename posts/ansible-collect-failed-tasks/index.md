---
title: Collect Failed Task Details in Ansible
description: A trick to collect the failed task details per server in a centralized place
date: 2021-07-05
---

Recently, I've started working on Ansible to help our organization to roll out [Node Exporter](https://github.com/prometheus/node_exporter) in a wide scale. I've had few struggles during this journey and I believe each struggles teaches something. Hence I'll be starting few series about my struggles and what I learnt from that.

I know, first of all a big apologies to all of you, my dear readers. It's been quite a while I didn't blog. Lately, I've got busy with my day-to-day work and seriously didn't get much time (reason below). I'll try to blog as much as possible. Hope you all doing well during this pandemic. Let's jump on to the topic

Today, I would like to share a very useful tip which I struggled a lot to find it online. This is about collecting some useful information about failures in ansible, so that it will help you to perform some post validation after the execution across many servers.

For an example, in my case, we had to roll out [Node Exporter](https://github.com/prometheus/node_exporter) across 60k+ linux servers. And it was a nightmare if something failes and try to perform validation on why the failure was. Hence, we need some kind of reporting which can tell us some details about the server and the task which was failed with failure reason. I'm glad we nailed this as follows:

```yaml
tasks:
  - block:
      # Intentionally failing here
      - name: Deploy Node Exporter
        fail:
          msg: Failed intentionally
    rescue:
      - name: Record failure
        lineinfile:
          path: /tmp/execution-failures.csv
          line: '"{{ inventory_hostname }}","{{ tower_job_id }}","{{ ansible_failed_task[''name''] }}","{{ ansible_failed_result[''module_stderr''] }}","{{ ansible_failed_result[''stdout''] }}"'
          create: yes
        delegate_to: centralized.host.com
```

The trick here is `block...rescue` and in `rescue` capture some required key details for the validation. Here I'm capturing the following details:

- `inventory_hostname`: The destination host where the playbook is executed.
- `tower_job_id`: The ansible tower job id. Recording this in case if any ansible issues found, we'll report to ansible team with this detail for them to debug and help.
- `ansible_failed_task['name']`: Name of the failed task.
- `ansible_failed_result['module_stderr']`: Captures the stderr of the failed task. This is more important for us because this gives us details about the failure reason.
- `ansible_failed_result['stdout']`: This will be empty in most of the cases as the failed task will contain only `stderr`, not `stdout`. Keeping this for any unexpected.

Hope this helps. Shoot me with your questions here: https://github.com/email2vimalraj/site/issues/new
