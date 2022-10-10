import { capitalize } from '../common';
import { chance } from './Chance';
import { makeMockGenerator, MockGenerator } from './MockGenerator';
import { SeriesCategory } from './SeriesCategory';
import { SeriesLanguage } from './SeriesLanguage';
import randomWords from 'random-words';
import { addArticle, adjectives, nouns } from './randomWords';
import * as japaneseFemaleNames from 'japanese-name-generator/data/names/female.json';
import * as japaneseSurnames from 'japanese-name-generator/data/names/surnames.json';

export interface Series {
    id: number;
    title: string;
    category: SeriesCategory;
    language: SeriesLanguage;
    publisher?: string;
    label?: string;
    description?: string;
    bookWalkerId?: string;
    coverUrl?: string;
}

export const seriesMock: MockGenerator<Series> = makeMockGenerator(
    'series',
    'id',
    () => {
        const title = chance.pickone(testTitles).replace(/\%[\d\w]*/g, matched => {
            switch(matched) {
                case '%a': return chance.pickone(adjectives);
                case '%ua': return capitalize(chance.pickone(adjectives));
                case '%aa': return addArticle(chance.pickone(adjectives));
                case '%n': return chance.pickone(nouns);
                case '%un': return capitalize(chance.pickone(nouns));
                case '%an': return addArticle(chance.pickone(nouns));
                case '%f': return chance.pickone(japaneseFemaleNames);
                case '%s': return chance.pickone(japaneseSurnames);
                case '%u': return capitalize( chance.word() );
                case '%w': return randomWords(1)[0];
                case '%uw': return capitalize(randomWords(1)[0] );
                case '%c': return chance.letter({ casing: 'lower' });
                case '%uc': return chance.letter({ casing: 'upper' });
                default:
                    return chance.word();
            }
        });
        return {
            id: chance.integer({min: 1, max: 1000}),
            title,
            category: chance.pickone([SeriesCategory.lightNovel, SeriesCategory.manga]),
            language: chance.pickone([SeriesLanguage.english, SeriesLanguage.japanese]),
        };
    }
);

const testTitles = [
    'The %n of %u',
    'Reincarnated as %an',
    'Reincarnated as %aa %n',
    'I\'m the villainess, so I\'ll %w to my heart\'s content',
    'Dominating at Level 1 with my %w cheat',
    'Exploring the dungeon with my %a %n',
    'Expelled from the hero\'s party, I began a quiet life with my %a %n',
    'In another world with my %n',
    'My classmate %s is secretly %a at home',
    'I %w in secret with the cutest girl in class',
    'My childhood friend turned out to be %w',
    '%u is too %a and I can\'t stand it anymore',
    'I don\'t stand out in class, but I %w with %s',
    'My laid-back life in the forests of %u',
    'I\'m the demon lord, but the hero has my %n!?',
    '%uw %ua Online',
    'The %a saga of %u',
    'The super-popular transfer student %s %f can\'t %w when I\'m next to her',
];
