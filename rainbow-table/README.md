# vet.domains Rainbow Table

This repository contains a script to generate list of all registered names and their corresponding hashes on vet.domains. A rainbow table is a precomputed table for reversing cryptographic hash functions. In this context, it allows for quick lookup of names given their hash.

The table consists of two main columns:
1. Hash: The cryptographic hash of the name
2. Name: The corresponding human-readable name

This data can be useful for reverse lookup of vet.domains names from their hashes

## Generate a new dump

```shell
node dump.mjs > data.sql
```

## Import names

```shell
pg_dump -c -x -O --if-exists --no-tablespaces -t ens_names -f data.sql
```
