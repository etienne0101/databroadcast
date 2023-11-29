---
title: Data blogging documentation
date: 2023-11-22
image: /images/datastories/canada-public-art.jpeg
description: A description of the post in one sentence
tags:
  - Key
  - Word
---

# Simple markdown

## Use markdown syntax

### Some examples

This is a text. Just write as usual. No tricks.

<br/>

Jump line by inserting `<br/>`

<br/>

And here is [a link](https://example.com). This is a **text in bold** and a *text in italic*

> Here is quote

You can add some more text here, as a paragraph.

<hint>Here is something important</hint>

## Insert charts and maps

### Line chart

#### Upload data

In the `/posts/data` folder, add a csv file.

#### Create a data visualisation

Then, insert the visualisation with the `Viz` syntax.

#### Viz attributes

`data` : the file name. Example: *cars*, and not *cars.csv*
`viztype` : the visualisation type. Example: *linechart*
`x` : the field want to see as the x axis. Example: *age*
`y` : the field want to see as the y axis. Example: *count*

<br/>

%%Viz:data=year-template,viztype=linechart,x=year,y=count%%

### Plot map

#### Upload data

In the `/posts/data` folder, add a csv file.

<hint>The csv file must have a **lat** and **lon** fields</hint>

#### Create a data visualisation

Then, insert the visualisation with the `Viz` syntax.

#### Viz attributes

`data` : the file name. Example: *cars*, and not *cars.csv*
`viztype` : the visualisation type. Example: *plotmap*
`plotlabel` : the value you want to be shown as info on the map markers. Example: *car_model*
`view` : a custom zoom position and level. Example: *europe*

<br/>

%%Viz:data=injection-sites,viztype=plotmap,plotlabel=City,view=europe%%

### Plot chart

#### Upload data

In the `/posts/data` folder, add a csv file.

#### Create a data visualisation

Then, insert the visualisation with the `Viz` syntax.

#### Viz attributes

`data` : the file name. Example: *cars*, and not *cars.csv*
`viztype` : the visualisation type. Example: *plotchart*
`x` : the field want to see as the x axis. Example: *age*
`y` : the field want to see as the y axis. Example: *count*
`plotlabel` : the value you want to be shown as info on the map markers. Example: *car_model*

<br/>

%%Viz:data=effectif-lycee,viztype=plotchart,x=2ndes_GT_filles,y=2ndes_GT_garçons,color=secteur,plotlabel=Patronyme%%
