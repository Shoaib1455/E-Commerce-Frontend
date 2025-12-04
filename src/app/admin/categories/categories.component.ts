import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Category } from 'src/app/shared/models/category.model';
import { NbSidebarService } from '@nebular/theme';

@Component({
    selector: 'admin-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    categories: Category[] = [];
    selected: Category | null = null;

    constructor(private svc: CategoriesService, private sidebar: NbSidebarService) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.svc.getAll().subscribe(list => (this.categories = list || []));
    }

    openSidebar(cat?: Category): void {
        this.selected = cat ? { ...cat } : { name: '', description: '' } as Category;
        this.sidebar.toggle(true, 'category-sidebar');
    }

    onSaved(_cat: Category | null): void {
        // If saved is null it means the sidebar was cancelled; always close the sidebar and
        // refresh the list when a category was actually saved.
        this.sidebar.toggle(false, 'category-sidebar');
        if (_cat) {
            this.load();
        }
    }

    deleteCategory(id?: number): void {
        if (!id) return;
        if (!confirm('Delete this category?')) return;
        this.svc.delete(id).subscribe(() => {
            this.categories = this.categories.filter(c => c.id !== id);
        });
    }
}
