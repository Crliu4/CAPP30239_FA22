# <a href="https://crliu4.github.io/CAPP30239_FA22/final_project/code/project.html">Final Project - The Tate Collection through the Years</a>

## Folders
* cleaned_data
    * aa_counts.csv - artist artwork count in entire Tate collection
    * aa_counts_url.csv - same as aa_counts.csv but with relative path to images
    * ac_med.csv - acquisitions by year and medium
    * watercolors_cg_hex_dropna.csv - dropped rows in watercolors_cg_hex.csv with missing year
    * watercolors_cg_hex.csv - converted RGB codes in watercolors_cs.csv to hex
    * watercolors_cg.csv - 3 most common colors by proportion (w/ year) using colorgram package
    * watercolors_hex_dropna.csv - dropped rows in watercolors_hex.csv with missing year
    * watercolors_hex.csv - converted RGB codes in watercolors.csv to hex
    * watercolors.csv - most dominant color for each watercolor artwork (includes year) using color thief package

* code
    * bar.js - D3.js code to create acquisitions by year and medium stacked bar chart
    * color.js - D3.js code to create dominant watercolor color chart
    * color1.js - D3.js code to create largest area watercolor color chart
    * data_cleaning.ipynb - python notebook to clean/process raw data
    * project.html - html code for project page and content
    * styles.css - css code for html layout and styling
    * treemap.js - D3.js code to create number of artworks in collection per artist treemap

* libs
    * d3-color-legend.js - library for color scheme used in code/bar.js

* pics
    * jpg files for all ~7,000 watercolor works

* pics1
    * jpg files downloaded from cleaned_data/aa_counts.csv merged with raw_data/the-tate-collection.csv to get 
    updated picture URLs

* raw_data
    * artist_data.csv and artwork_data.csv source: <a href="https://github.com/tategallery/collection">Tate Gallery Github</a>
    * the-tate-collection.csv (raw artwork data) & the-tate-collection-3.csv (raw artwork data, rows only with 'watercolour' in medium) source: <a href="https://public.opendatasoft.com/explore/dataset/the-tate-collection/table/">OpenDataSoft</a>
    * watercolours.csv - intermediate data file (artist and artwork merged, keep rows only with 'watercolour' in medium)

## File in root directory
* 3 Minute Overview.pdf (Oct 31, 2022) - 3 minute story with basic sketches of charts

#### <a href=https://youtu.be/yT243u0J_VA>Recorded Presentation</a>