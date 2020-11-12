import React from "react";
import { auth } from "services/firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signUp = (email, password, name) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        if (!!user) {
          await auth.currentUser.updateProfile({ displayName: name });
        }
        return user;
      });
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const value = React.useMemo(() => ({ user, signUp, signIn, signOut }), [
    user
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
