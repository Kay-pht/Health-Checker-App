import { ChatCompletionMessageParam } from "openai/resources";

const prompt = (answers: any): ChatCompletionMessageParam[] => {
  return [
    { role: "system", content: "あなたは食生活アドバイザーです" },
    {
      role: "user",
      content:
        "ユーザーから食生活についての報告があるので、それを把握して、不足している栄養素、食生活の採点(100点満点)、接種すべき具体的な食材をフォーマットに厳密に従って返す。それ以外の文字は禁止。フォーマット例:[{nutrition:鉄分,ビタミンC},{food:キウイ,小魚},{score:73}]また質問内容は下記の摂取頻度。q1:白米、玄米、パン（食パンや全粒粉パン）【炭水化物】,q2:うどん、そば、パスタ【炭水化物】,q3:鶏肉（むね肉、もも肉）【肉類】,q4:豚肉（豚ロース、豚バラ）【肉類】,q5:牛肉（赤身、ひき肉）【肉類】,q6:魚（サバ、サケ、イワシ）【魚類】,q7:納豆、豆腐、枝豆【豆類】,q8:卵【卵類】,q9:にんじん、大根、玉ねぎ【根菜類】,q10:ほうれん草、ブロッコリー、ピーマンなど【緑黄色野菜】,q11:キャベツ、白菜、レタス【葉物野菜】,q12:じゃがいも、さつまいも【芋類】,q13:りんご、バナナ、みかん【果物】,q14:いちご、ブルーベリー【ベリー類】,q15:牛乳、ヨーグルト【乳製品】,q16:チーズ【乳製品】,q17:玄米、雑穀米、オートミール【穀物】,q18:海藻（わかめ、昆布、ひじき）【海藻類】,q19:ごま、亜麻仁【種子類】,q20:アーモンド、くるみ【ナッツ類】,q21:オリーブオイル、ごま油【油脂】,q22:缶詰の魚（さば缶、ツナ缶）【保存食品・魚介類】,q23:キノコ類（しいたけ、まいたけ、しめじ）【キノコ類】,q24:大豆製品（豆乳、大豆ミート）【豆製品】,q25:サプリメント（ビタミン剤、プロテイン）【栄養補助食品】",
    },
    {
      role: "system",
      content: "了解",
    },
    {
      role: "user",
      content: JSON.stringify(answers),
    },
  ];
};
export default prompt;
