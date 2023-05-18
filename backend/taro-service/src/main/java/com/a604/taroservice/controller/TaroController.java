package com.a604.taroservice.controller;

import com.a604.taroservice.data.TaroResult;
import com.a604.taroservice.data.dto.TaroResultDto;
import com.a604.taroservice.service.TaroResultService;
import com.a604.taroservice.service.TodayTaroService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/tarot")
public class TaroController {

    private final TodayTaroService todayTaroService;
    private final TaroResultService taroResultService;

    @GetMapping("/today")
    @ApiOperation(value = "오늘의 운세", notes = "랜덤하게 오늘의 운세 값을 보여줍니다.")
    public ResponseEntity<?> todayTaro(){
        return new ResponseEntity<>(todayTaroService.todayTaro(), HttpStatus.OK);
    }

    @PostMapping("/result")
    @ApiOperation(value = "타로 결과 저장", notes = "타로 결과값을 저장합니다.")
    public ResponseEntity<?> saveTaroResult(@RequestBody TaroResultDto taroResultDto) throws IOException {
        taroResultService.saveTaroResult(taroResultDto);
        return new ResponseEntity<>(taroResultDto, HttpStatus.OK);
    }

    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody TaroResultDto dto) throws InterruptedException {
        Long testseq = 6L;
        String[] ls = new String[]{"새로운 직장이나 기회에 대한 탐색과 모험이 당신에게 취직의 가능성을 제공할 수 있습니다. 주변에 대한 지식과 경험이 부족할 수 있으므로 조언을 구하고 신중한 결정을 내리는 것이 중요합니다.",
                "당신은 능력과 재능을 통해 취직에 대한 성공을 이룰 수 있습니다. 창의력과 행동력을 발휘하여 자신의 잠재력을 최대한으로 활용하고 새로운 기회를 창출하세요.",
                "직감과 내면의 지혜가 당신을 취직에 이끌 수 있습니다. 내면의 목소리에 귀 기울이고 직감을 신뢰하세요. 숨겨진 기회를 발견할 수 있으며, 조용한 고려와 집중이 필요합니다.",
                "자신의 창의력과 지도력을 활용하여 새로운 직장이나 취직 기회를 찾을 수 있습니다. 인내와 관용으로 주변과 협력하며, 자신의 자부심과 자신감을 가지고 도전하세요.",
                "지도력과 조직력으로 취직에 성공할 수 있습니다. 리더십과 결단력을 발휘하며 자신의 경험과 전문성을 강조하세요. 조직 내에서 중요한 역할을 수행할 수 있습니다.",
                "전통과 교육적인 배움을 통해 취직에 대한 안정과 성과를 찾을 수 있습니다. 멘토의 조언과 가르침을 받고, 사회적 규칙과 기대를 따르는 것이 중요합니다.",
                "협력과 동반자에 의한 취직 기회가 있을 수 있습니다. 협력 관계를 발전시키고 타인과의 연결을 강화하여 새로운 기회를 찾으세요. 선택과 결정이 중요합니다.",
                "자기 주도적인 태도와 결단력을 통해 취직에 성공할 수 있습니다. 목표를 향해 진취하고 어려움을 극복하는 데 집중하세요. 팀워크와 조정이 필요할 수 있습니다.",
                "자신의 강인함과 자신감을 통해 취직에 성공할 수 있습니다. 어려움을 극복하고 도전에 맞서는 데 필요한 용기와 인내심을 발휘하세요. 자신의 능력과 자신감을 믿고 전진하세요.",
                "혼자서 내면의 깊은 탐구를 통해 취직에 대한 깨달음을 얻을 수 있습니다. 외부의 소음과 간섭에서 독립하여 자신의 목표와 가치에 집중하세요. 조용한 환경과 시간이 필요할 수 있습니다.",
                "운명의 회전과 변화가 당신에게 취직 기회를 제공할 수 있습니다. 주어진 기회를 적극 활용하고 타이밍을 놓치지 마세요. 운이 변동될 수 있으므로 유연성을 유지하세요.",
                "공정과 균형을 통해 취직에 성공할 수 있습니다. 자신의 역량과 성과에 대해 공정하게 대우받을 수 있으며, 사회적 정의와 도덕적 원칙을 지키는 것이 중요합니다.",
                "취직에 대한 관점을 변화시키고 새로운 시각을 찾을 필요가 있습니다. 현재의 상황에서 벗어나고 새로운 아이디어와 전략을 모색하세요. 불편함과 희생이 필요할 수 있으나, 그것이 미래에 이루어질 성공을 이끌 수 있습니다.", "새로운 시작과 변화를 통해 취직 기회가 제공될 수 있습니다. 과거의 패턴과 관습에서 벗어나고 새로운 가능성을 받아들이세요. 변화는 처음에는 불편할 수 있지만, 새로운 성장과 발전을 위해 필요합니다.", "조화와 균형을 통해 취직에 성공할 수 있습니다. 다양한 요소를 조화롭게 조합하고 조절하여 목표를 달성하세요. 인내심과 절제력이 필요하며, 조화로운 관계 구축이 중요합니다.", "현재의 제약과 제한에서 벗어나기 위해 노력해야 할 수 있습니다. 이기적인 동기와 해방을 위한 욕구를 극복하고 자유로운 선택을 할 준비가 되어야 합니다. 자기 통제와 자기 관리를 통해 취직에 성공할 수 있습니다.", "현재의 직장이나 상황이 불안정하며 변화가 필요하다는 것을 시사합니다. 기존의 직장이나 관행에서 벗어나고 새로운 기회를 모색하세요. 변화는 처음에는 어려움을 초래할 수 있지만, 당신에게 더 나은 결과를 가져다 줄 수 있습니다.", "희망과 영감을 가지고 취직에 대한 꿈을 향해 나아갈 수 있습니다. 자신의 비전과 목표를 추구하며, 자신을 믿고 행동하세요. 긍정적인 마음가짐과 믿음을 가지고 앞으로 나아가세요.", "직장에 대한 불확실성과 감정적인 변동이 있을 수 있습니다. 현재의 상황을 근거로 조심스럽게 결정을 내리고, 진실과 현실을 분별하는 데 주의하세요. 직관과 감정을 활용하여 적절한 선택을 할 수 있습니다.","밝은 미래와 성공적인 취직이 당신을 기다리고 있습니다. 자신의 능력과 자신감을 발휘하여 긍정적인 에너지를 퍼뜨리세요. 자신의 업적과 잠재력을 인정받을 수 있으며, 성공적인 진로 개척이 가능합니다.","과거의 경험과 배움을 토대로 새로운 기회를 발견할 수 있습니다. 자신의 역량과 잠재력을 재평가하고 자기 발견을 통해 진로를 재정립하세요. 새로운 출발과 변화를 통해 취직에 성공할 수 있습니다.",
                "완성과 성취를 상징합니다. 당신은 목표를 달성하고 새로운 직장이나 기회를 만날 가능성을 갖고 있습니다. 최근의 노력과 경험을 토대로 새로운 챕터를 시작할 수 있습니다."};
        String[] arr = dto.getCardSeqList().split(",");
        int[] cards = new int[]{Integer.parseInt(arr[0]), Integer.parseInt(arr[1]), Integer.parseInt(arr[2])};
        String contentList = "\"" + ls[cards[0]-1] + "\"$\"" + ls[cards[1]-1] + "\"$\"" + ls[cards[2] -1] + "\"$\"" + "종합적으로 보았을 때, 당신은 현재 취직에 대한 걱정이 많은 만큼 내면의 지혜와 강인함으로 이 시기를 이겨낼 필요가 있음을 시사합니다. 당신 스스로의 능력을 믿고 취직을 위해 묵묵히 능력을 정진하다보면, 좋은 결과가 있을 것입니다.\"";
        String story = "옛날 옛적 어느 작은 마을에 한 남자가 살고 있었습니다. 그는 취직에 대한 큰 고민을 하고 있었어요. 매일 아침 해가 뜨기 전에 남자는 일어나서 마을 돌아다니며 기회를 찾았어요. 그는 많은 회사에 이력서를 보내고 면접에 참석하기 위해 최선을 다했어요. 하지만 쉽지 않았어요. 거절과 실패의 순간들이 찾아왔지만, 남자는 흔들리지 않았어요. 그리고 어느 날, 기적이 일어났어요. 한 회사에서 남자의 열정과 노력을 알아봤고 취직 제안을 받았어요. 남자는 눈물을 흘리며 기뻐했어요. 그의 꿈이 이루어질 때의 행복한 순간이었어요.";
        TaroResultDto respdto = new TaroResultDto(testseq, "취직", dto.getContentInput(), dto.getCardSeqList(), contentList, "https://astaro.s3.ap-northeast-2.amazonaws.com/f746df39-49c9-4486-be62-c56a1dd4bddb.png", "https://astaro.s3.ap-northeast-2.amazonaws.com/384d0180-f53c-11ed-8616-0242ac110008.mp4", story);
        Thread.sleep(10000);
        return new ResponseEntity<>(respdto, HttpStatus.OK);
    }
}
