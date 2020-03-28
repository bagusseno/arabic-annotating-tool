#!/usr/bin/env python
# coding: utf-8

# In[14]:

import pandas as pd

def group(ayats):
        
    length = len(ayats)
    i = 0

    grouppedAyats = [[]]

    index = 0
    for row in ayats:

        # tokenizing location
        if index < length-1:
            currentLocation = row["AYAT_NUMBER"]
            nextLocation = ayats[index+1]['AYAT_NUMBER']

            if index == length-2 or currentLocation != nextLocation:
                i = i+1
                grouppedAyats.append([])
            
            ayats[index]['AYAT_NUMBER'] = i
            
            words = {
                'OPEN TAG' : '',
                'AYAT' : int(row['AYAT_NUMBER']),
                'ARAB' : row['ARAB'],
                'TAG' : row['TAG'],
                'WORD_NUMBER' : row['WORD_NUMBER'],
                'AYAT_NUMBER' : row['AYAT_NUMBER'],
                'CLOSE TAG' : ''
            }
            
            grouppedAyats[i].append(words)

        index += 1
        
    return grouppedAyats

def ungroup(ayats):

    ungrouppedAyats = []

    for ayat in ayats:
        for word in ayat:
            ungrouppedAyats.append(word)

    return ungrouppedAyats

def classify(patterns, ayats):

    # Prepare data
    ayats = group(ayats)

    # Rule based logic
    ayatIndex = 0
    entityIndex = 0

    for ayat in ayats:
        for pattern in patterns:
            patternLength = len(pattern)
            for wordIndex in range(len(ayat) - patternLength):
                # Get Array of words based on the pattern length
                wordTagsArray = []
                for wordOfArrayIndex in range(patternLength):
                    wordTagsArray.append(ayat[wordIndex+wordOfArrayIndex]['TAG'])
                if wordTagsArray == pattern:
                    print('foundd')
                    ayat[wordIndex]['OPEN TAG'] += str(entityIndex) + '('
                    ayat[wordIndex+patternLength]['CLOSE TAG'] += str(entityIndex) + ')'
                    entityIndex += 1
        ayatIndex += 1

    return ungroup(ayats)




