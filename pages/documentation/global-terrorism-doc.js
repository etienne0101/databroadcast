import React from 'react';
import Layout from '../../components/main/Layout';
import styles from '../../styles/Datastories.module.css';
import CodeBlock from '../../components/main/CodeBlock';

const GlobalTerrorismDocumentation = () => {
  return (
    <>
      <Layout>
        <div className={styles.datastorycontainer}>
          
        <h1 className={styles.title}>Documentation of global terrorism exploration</h1>

        <h1 className={styles.subtitle}>Data preparation</h1>
        <p className={styles.paragraph}>
          Some details about the code structure for this type of visualizations
        </p>
        <h1 className={styles.thirdtitle}>Spliting and refining with R</h1>
        <p className={styles.paragraph}>
          I received a large XLS file from the <b>University of Maryland's "Global Terrorism DataBase".</b>
          <br></br>
          <br></br>
          I converted it to CSV, but it was too large (186Mb) to get in my NextJs project. So I decided to split it for every year (1970 to 2020).
        </p>


<CodeBlock code={`
#Reading and splitting 2000 to 2020 files

df <- read_csv2("data/global-terrorism-00-20.csv")

## Retain only 6 specified fields
df <- df[, c("eventid", "nkill", "iyear", "latitude", "longitude", "gname")]

split_dfs <- split(df, df$iyear)

for (iyear in names(split_dfs)) {
  write_csv(split_dfs[[iyear]], paste0("global-terrorism-", iyear, ".csv"))
}

for (iyear in names(split_dfs)) {
  csv_path = paste0("global-terrorism-", iyear, ".csv")
  json_path = paste0("global-terrorism-", iyear, ".json")
  
  df_year <- read_csv(csv_path)
  json_data <- toJSON(df_year, pretty = TRUE)
  
  write(json_data, file = json_path)
}
`}/>

<h1 className={styles.thirdtitle}>Extracting terrorist groups names</h1>

<p className={styles.hint}>
The field <i>"gname"</i> contains the name of the group that carried out the attack. These categories do not represent
discrete entities : they are not exhaustive or mutually exclusive.
</p>

<p className={styles.paragraph}>
 Here is a Python script for the year 1971
</p>

<CodeBlock code={`
# Load the data from the provided JSON file for 1971
with open('/mnt/data/global-terrorism-1971.json', 'r') as file:
    data_1971 = json.load(file)

# Extract the "gname" entries from the data for 1971
gname_list_1971 = [entry.get('gname', '') for entry in data_1971]

# Calculate the frequency of each "gname" entry for 1971
gname_counts_1971 = Counter(gname_list_1971)

# Get the 10 most frequent "gname" entries for 1971
top_10_gnames_1971 = gname_counts_1971.most_common(10)
top_10_gnames_1971
`}/>

  <p className={styles.paragraph}>
  Here is the result :
  </p>

<CodeBlock code={`
('Unknown', 98),
('Irish Republican Army (IRA)', 60),
('Left-Wing Militants', 48),
("Turkish People's Liberation Army", 23),
('Chicano Liberation Front', 22),
('Black Liberation Army', 16),
('Armed Revolutionary Independence Movement (MIRA)', 16),
('Student Radicals', 13),
('Black Nationalists', 13),
('Weather Underground, Weathermen', 12)
`}/>

</div>
      </Layout>
    </>
  );
}

export default GlobalTerrorismDocumentation;
