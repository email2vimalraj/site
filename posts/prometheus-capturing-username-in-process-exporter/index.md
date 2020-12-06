---
title: Capturing Username in Process Exporter with Prometheus
description: Through this post let's learn about capturing user of the process in Process Exporter and leverage the metric_relabel_configs in prometheus to label the username
date: 2020-12-06
---

Recently, stumbled upon a task where we wanted to capture the username of the process with the [process exporter](https://github.com/ncabatoff/process-exporter) and store as a label in prometheus. There is no clear documentation around this on how to accomplish. So I thought let's share what I've learnt which I believe might be useful for someone.

Let's see how to capture the username in the [process exporter](https://github.com/ncabatoff/process-exporter).

## Pre-requisite

- You should be having prometheus running. In case you want to know how to setup, head [here](https://prometheus.io/docs/prometheus/latest/getting_started/).
- To setup the process exporter, refer [here](https://github.com/ncabatoff/process-exporter).

## Process Exporter Config

To make process exporter mine a required process, I've the following sample config `yaml` file:

```yaml
process_names:
  - name: "{{.ExeBase}}"
    cmdline:
      - crond'
```

The `ExeBase` is the basename of the executable which I wanted to capture. Now I would like to know the user who is executing the `crond` process. So I'll change the `yaml` to:

```yaml
process_names:
  - name: "{{.ExeBase}};{{.Username}}"
    cmdline:
      - crond'
```

Notice that I've added `;{{.Username}}`, the `Username` captures the user of the given process, here it is `crond`. The reason that I've added semicolon(`;`) is because I'll use the [metric_relabel_configs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#metric_relabel_configs) in prometheus scrape config to split and store username as a separate label.

I've stored the file as `proc-config.yaml` and will start the process exporter as:

```bash
> process-exporter -config.path proc-config.yaml
```

For now, if you scrape the process exporter (http://localhost:9256/metrics), you will get the metrics in the following format:

```
namedprocess_namegroup_num_procs{groupname='crond;vimalraj'} 1
```

Here, the `groupname` says the `crond` process and triggered by user `vimalraj`.

Now, let's look at how we configure prometheus to store the user as a separate label.

## Prometheus Config

Open up the `prometheus.yml` file and add the new scrape target as follows:

```yaml
scrape_configs:
  - job_name: 'process_exporter'
    scrape_interval: 15s
    static_configs:
      - targets: 
        - localhost:9256
    metric_relabel_configs:
      - source_labels: ["groupname"]  # the label which needs to be filtered
        regex: "(.*);(.*)"            # the regex to find the expected match
        target_label: "processname"   # add a new label
        replacement: "$1"             # substitute with the 1st match
      - source_labels: ["groupname"]  # the label which needs to be filtered
        regex: "(.*);(.*)"            # the regex to find the expected match
        target_label: "username"      # add a new label
        replacement: "$2"             # substitute with the 2nd match
```

To know more about the `metric_relabel_configs`, refer prometheus documentation [here](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#metric_relabel_configs).

Now reload the config and query for `namedprocess_namegroup_num_procs`. You should be seeing the following result:

```
namedprocess_namegroup_num_procs{groupname='crond;vimalraj', processname='crond', username='vimalraj'} 1
```

Please note that I kept `groupname` as it is, in case you want to remove, you can use `action` to drop that label.

In case you found this post useful, please do share it. For any questions, feel free to open an `issue` [here](https://github.com/email2vimalraj/site/issues) to discuss further.