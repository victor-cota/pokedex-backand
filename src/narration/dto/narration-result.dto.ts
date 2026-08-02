import { ApiProperty } from '@nestjs/swagger';

export class NarrationResultDto {
  @ApiProperty({
    description: 'Categoria traduzida para português',
    example: 'Pokémon rato elétrico',
  })
  categoriaPortugues!: string;

  @ApiProperty({
    description: 'Descrição em português simples, com 40 a 100 palavras',
    example:
      'Pikachu armazena eletricidade nas bolsas localizadas em suas bochechas. Seu corpo pequeno e ágil permite que ele se mova rapidamente, enquanto sua cauda possui um formato marcante. Quando vários Pikachu se reúnem, a eletricidade acumulada pode se tornar muito intensa. Ele pertence ao tipo elétrico e é conhecido por sua energia e aparência facilmente reconhecível.',
  })
  descricaoPortugues!: string;

  @ApiProperty({
    description: 'Texto final montado pelo backend para o Text-to-Speech',
    example:
      'Pikachu, o Pokémon rato elétrico, armazena eletricidade nas bolsas localizadas em suas bochechas.',
  })
  textoParaNarracao!: string;
}
