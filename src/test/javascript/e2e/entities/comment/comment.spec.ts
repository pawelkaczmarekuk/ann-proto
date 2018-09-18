import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommentComponentsPage, CommentDeleteDialog, CommentUpdatePage } from './comment.page-object';

describe('Comment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let commentUpdatePage: CommentUpdatePage;
    let commentComponentsPage: CommentComponentsPage;
    let commentDeleteDialog: CommentDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Comments', async () => {
        await navBarPage.goToEntity('comment');
        commentComponentsPage = new CommentComponentsPage();
        expect(await commentComponentsPage.getTitle()).toMatch(/Comments/);
    });

    it('should load create Comment page', async () => {
        await commentComponentsPage.clickOnCreateButton();
        commentUpdatePage = new CommentUpdatePage();
        expect(await commentUpdatePage.getPageTitle()).toMatch(/Create or edit a Comment/);
        await commentUpdatePage.cancel();
    });

    it('should create and save Comments', async () => {
        await commentComponentsPage.clickOnCreateButton();
        await commentUpdatePage.setContentInput('content');
        expect(await commentUpdatePage.getContentInput()).toMatch('content');
        await commentUpdatePage.annotationSelectLastOption();
        await commentUpdatePage.save();
        expect(await commentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Comment', async () => {
        const nbButtonsBeforeDelete = await commentComponentsPage.countDeleteButtons();
        await commentComponentsPage.clickOnLastDeleteButton();

        commentDeleteDialog = new CommentDeleteDialog();
        expect(await commentDeleteDialog.getDialogTitle()).toMatch(/Are you sure you want to delete this Comment?/);
        await commentDeleteDialog.clickOnConfirmButton();

        expect(await commentComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
