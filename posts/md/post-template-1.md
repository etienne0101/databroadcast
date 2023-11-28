---
title: Data blogging documentation
date: 2023-11-22
image: /images/datastories/canada-public-art.jpeg
description: A description of the post in one sentence
tags:
  - Key
  - Word
---

# Only markdown

## Use markdown syntax

### Some examples

This is a text. Just write as usual. No tricks.

<br/>

Jump line by inserting `<br/>`.

<br/>

And here is [a link](https://example.com). This is a **text in bold** and a *text in italic*

> Here is an important quote

### Line chart

%%Viz:data=year-template,viztype=linechart,x=year,y=count%%

### Plot map

%%Viz:data=injection-sites,viztype=plotmap,plotlabel=City,view=europe%%

### Plot chart

%%Viz:data=effectif-lycee,viztype=plotchart,x=2ndes_GT_filles,y=2ndes_GT_garçons,plotlabel=Patronyme%%
