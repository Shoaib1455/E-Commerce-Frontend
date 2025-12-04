import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { CategoriesService } from '../categories.service';

@Component({
    selector: 'app-category-sidebar',
    templateUrl: './category-sidebar.component.html',
    styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent implements OnChanges {
    @Input() category?: Category | null;
    @Output() saved = new EventEmitter<Category | null>();

    model: Category = { name: '' } as Category;
    saving = false;

    constructor(private svc: CategoriesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['category']) {
            this.model = this.category ? { ...this.category } : ({ name: '' } as Category);
        }
    }

    save(): void {
        if (!this.model.name) return;
        this.saving = true;
        const op = this.model.id ? this.svc.update(this.model.id, this.model) : this.svc.create(this.model);
        op.subscribe({
            next: (res: Category) => {
                this.saving = false;
                this.saved.emit(res);
            },
            error: () => (this.saving = false)
        });
    }

    cancel(): void {
        this.saved.emit(null);
    }
}
