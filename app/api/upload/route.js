export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    // Verificar tamanho do arquivo - 200KB = 200 * 1024 bytes
    const MAX_FILE_SIZE = 200 * 1024; // 200KB em bytes
    
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { 
          success: false, 
          error: "O tamanho da imagem excede o limite de 200KB" 
        },
        { status: 400 }
      );
    }
    
    // Continuar com o processamento do upload se o arquivo estiver dentro do limite
    // Resto do código de upload...
    
    // Retornar a URL da imagem após upload bem-sucedido
    return Response.json({ 
      success: true, 
      url: imageUrl 
    });
    
  } catch (error) {
    console.error('Erro no upload da imagem:', error);
    return Response.json(
      { 
        success: false, 
        error: "Erro ao processar o upload da imagem" 
      },
      { status: 500 }
    );
  }
} 