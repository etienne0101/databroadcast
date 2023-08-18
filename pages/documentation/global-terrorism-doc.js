import React from 'react';
import Layout from '../../components/main/Layout';
import styles from '../../styles/Datastories.module.css';
import CodeBlock from '../../components/main/CodeBlock';

const GlobalTerrorismDocumentation = () => {
  return (
    <>
      <Layout>
        <div className={styles.datastorycontainer}>
        <h1 className={styles.title}>Documentation of global terrorism dataviz</h1>
        <p className={styles.paragraph}>
          Text
        </p>

          <p className={styles.hint}>
          Hint
          </p>

        <h1 className={styles.subtitle}>Code documentation</h1>
        <p className={styles.paragraph}>
          Some details about the code structure for this type of visualizations
        </p>
        <h1 className={styles.thirdtitle}>Spliting data with R</h1>
        <p className={styles.paragraph}>
          I received a large Xls file from the University of Maryland's "Global Terrorism DataBase".
          <br></br>
          <br></br>
          I converted it to CSV, but it was too large (186Mb) to get in my NextJs project. So I decided to split it for every year (1970 to 2020).
        </p>


<CodeBlock code={`
#Reading and splitting 2000 to 2020 files

df <- read_csv2("data/global-terrorism-00-20.csv")

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

#Reading and splitting 1970 to 2000 files (longitudes were broken)

df <- read.csv2("data/global-terrorism-70-00.csv")

split_dfs <- split(df, df$iyear)

for (iyear in names(split_dfs)) {
  write_csv2(split_dfs[[iyear]], paste0("global-terrorism-", iyear, ".csv"))
}

for (iyear in names(split_dfs)) {
  csv_path = paste0("global-terrorism-", iyear, ".csv")
  
  # Re-read the data using read.csv2
  df_year <- read.csv2(csv_path)
  
  json_path = paste0("global-terrorism-", iyear, ".json")
  json_data <- toJSON(df_year, pretty = TRUE)
  write(json_data, file = json_path)
}
`}/>
      </div>
      </Layout>
    </>
  );
}

export default GlobalTerrorismDocumentation;
