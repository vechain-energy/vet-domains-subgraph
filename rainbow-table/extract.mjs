console.log(`
-- SQL script to recreate the ens_names table from a list of names

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.ens_names DROP CONSTRAINT ens_names_pkey;
DROP TABLE public.ens_names;
SET default_with_oids = false;

CREATE TABLE public.ens_names (
    hash character varying NOT NULL,
    name character varying NOT NULL
);


--
-- Data for ens_names
--
`);


const url = 'https://graph.vet/subgraphs/name/vns';
const queryTemplate = `
  query Registrations($skip: Int!) {
    domains(first: 1000, skip: $skip) {
      labelhash
      labelName
    }
  }
`;

const fetchData = async (skip) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: queryTemplate,
        variables: { skip },
        operationName: 'Registrations',
        extensions: {}
      })
    });

    const data = await response.json();
    
    if (data.data.domains.length === 0) {
      return false; // No more data
    }

    data.data.domains.forEach(domain => {
      if (domain.labelhash && domain.labelName) {
        console.log(`INSERT INTO public.ens_names (hash, name) VALUES ('${domain.labelhash}', '${domain.labelName}');`);
      }
    });

    return true; // More data might be available
  } catch (error) {
    console.error('Error fetching data:', error);
    return false; // Stop on error
  }
};

const fetchAllData = async () => {
  let skip = 0;
  let hasMoreData = true;

  while (hasMoreData) {
    hasMoreData = await fetchData(skip);
    skip += 1000;
  }
};

await fetchAllData();


console.log(`
--
-- Primary key and index for hash
--

ALTER TABLE ONLY public.ens_names
    ADD CONSTRAINT ens_names_pkey PRIMARY KEY (hash);
`);
