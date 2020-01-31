// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// // Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// // And load the modules.
// context.keys().map(context);

const app = require.context('./', true, /app.component\.spec\.ts$/);
// And load the modules.
app.keys().map(app);

const buglist = require.context('./', true, /bug-list.component\.spec\.ts$/);
// And load the modules.
buglist.keys().map(buglist);

const bug = require.context('./', true, /bug.component\.spec\.ts$/);
// And load the modules.
bug.keys().map(bug);


