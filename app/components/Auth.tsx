import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { Button } from "~/src";
const Auth = () => {
	const { isLoggedIn, user } = useAuth();
	const handleAuth = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				console.log("Logged In", result, token , user);
			})
			.catch((error) => {
				console.log("Caught error Popup closed", error);
			});
	};
	return (
		<div>
			{isLoggedIn && (
				<div className="inline-flex items-center">
					<p className="mr-2">{user.email}</p>
					<Button onClick={() => auth.signOut()}>Logout</Button>
				</div>
			)}
			{!isLoggedIn && (
				<Button onClick={() => handleAuth()}>Login with Google</Button>
			)}
		</div>
	);
};
export default Auth;
