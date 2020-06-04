

export class AuthService {
    // fake authentication service
    loggedIn = false;

    isAuthenticated() {
        // simmulate authentication tame and return promise.  A promisse
        // takes a metod to execute and resolve the promise.
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn)
                }, 1000);
            }
        );
        return promise;
    }

    logIn() {
        this.loggedIn = true;
    }

    logOut() {
        this.loggedIn = false;
    }
}