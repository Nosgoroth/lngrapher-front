import { capitalize } from '../common';
import { chance } from './Chance';
import { makeMockGenerator, MockGenerator } from './MockGenerator';
import { SeriesCategory } from './SeriesCategory';
import { SeriesLanguage } from './SeriesLanguage';

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
        const title = chance.pickone(testTitles).replace(/\%[\d\w]?/g, matched => {
            switch(matched) {
                case '%u': return capitalize( chance.word() );
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
    'The %u of %u',
    'Reincarnated as a %',
    'I\'m the villainess, so I\'ll % to my heart\'s content',
    'Dominating at Level 1 with my % cheat',
    'Exploring the dungeon with my %',
    'Expelled from the hero\'s party, I began a quiet life with my %',
    'In another world with my %',
    'My classmate %u is secretly % at home',
    'I % in secret with the cutest girl in class',
    'My childhood friend turned out to be %',
    '%u is too cute and I can\'t stand it anymore',
    'I don\'t stand out in class, but I % with %u'
];

