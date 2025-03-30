//app/api/imagekit-auth/route.js
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
});

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return Response.json(authenticationParameters);
  } catch (error) {
    console.error('Erro na autenticação do ImageKit:', error);
    return Response.json(
      { error: 'Erro na autenticação do ImageKit' }, 
      { status: 500 }
    );
  }
} 