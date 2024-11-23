"use client";

export default function NaverLoginButton() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const state = Math.random().toString(36).substring(2, 15);

    if (!clientId || !redirectUri) {
      alert("환경 변수가 제대로 설정되지 않았습니다.");
      return;
    }

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    window.location.href = naverAuthUrl;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="bg-green-500 text-white p-4 rounded-lg"
    >
      Sign in with Naver
    </button>
  );
}
