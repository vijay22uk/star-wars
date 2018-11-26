import Store from './index';
it('Store shoud exist', () => {
    expect(!Store.isAuthenticated);
});

it('Store set search remaining', () => {
    const afterCount = 555;
    Store.setSearchRemaining(afterCount);
    expect(afterCount === Store.getSearchRemaining());
});