import {MatPaginatorIntl} from '@angular/material';

export class MatPaginatorIntlGr extends MatPaginatorIntl {
    itemsPerPageLabel = 'Στοιχεία ανά σελίδα';
    nextPageLabel     = 'Επόμενη σελίδα';
    previousPageLabel = 'Προηγούμενη σελίδα';
    firstPageLabel = 'Πρώτη σελίδα';
    lastPageLabel = 'Τελευταία σελίδα'

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) {
            return `0 από ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} από ${length}`;
    }
}
