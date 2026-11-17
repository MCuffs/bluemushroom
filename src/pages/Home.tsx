// 파랑버섯 스튜디오 첫 화면. Astryx 부품으로 구성한다.
// 뼈대는 `astryx template centered-hero`(Layout > LayoutContent padding 6 > VStack gap 10)에서 시작했다.
// 주소의 자리 표시(#p1 ~ #p6, #dadwar)는 처리방침 페이지와 바깥 링크가 쓰므로 바꾸지 않는다.

import {useEffect, useState} from 'react';
import type {ComponentProps} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {VStack, HStack, Layout, LayoutContent} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {Section} from '@astryxdesign/core/Section';
import {Card} from '@astryxdesign/core/Card';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Token} from '@astryxdesign/core/Token';
import {Collapsible} from '@astryxdesign/core/Collapsible';
import {Divider} from '@astryxdesign/core/Divider';
import {Link} from '@astryxdesign/core/Link';
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
} from '@heroicons/react/20/solid';

const PRIVACY_URL = 'dadwar/privacy/';
const TEST_BUILD_URL = 'https://github.com/MCuffs/mandu-coporation/releases';
const CONTACT = 'contact@shuffla.io';

type CardTone = 'yellow' | 'green' | 'orange' | 'blue';

const FAMILY = [
  {
    role: '아빠',
    name: '칠석',
    face: 'assets/face-dad.webp',
    about:
      '희망퇴직 뒤 가족을 위해 무슨 일이든 하는 아빠. 무뚝뚝해도 가족 일이라면 발부터 움직입니다.',
  },
  {
    role: '엄마',
    name: '수진',
    face: 'assets/face-mom.webp',
    about:
      '흔들리는 집을 묵묵히 지탱하는 엄마. 온 가족을 품어 주지만, 엄마도 쉬어 갈 자리가 필요하죠.',
  },
  {
    role: '형',
    name: '철수',
    face: 'assets/face-cheolsu.webp',
    about:
      '뭐든 잘해야 마음이 놓이는 엘리트. 동생에게 잔소리는 많아도, 만수 편에 서 줄 사람은 역시 형입니다.',
  },
  {
    role: '막내',
    name: '만수',
    face: 'assets/face-mansu.webp',
    about:
      '생각보다 몸이 먼저 움직이는 말썽꾸러기. 사고도 크게 치지만, 가족을 향한 마음도 그만큼 큽니다.',
  },
];

// 가족사진에 서 있는 순서(왼쪽부터).
const PHOTO_ORDER = [
  {role: '아빠', name: '칠석'},
  {role: '형', name: '철수'},
  {role: '막내', name: '만수'},
  {role: '엄마', name: '수진'},
];

const VALUES = [
  {word: '가족', title: '가까이 있던 사람들', body: '우리 이야기의 첫 번째 주인공.'},
  {word: '기억', title: '오래 남기고 싶은 시간', body: '평범해서 더 소중했던 마음.'},
  {word: '게임', title: '그래서, 게임을 만듭니다', body: '함께 웃을 수 있는 다음 장.'},
];

const GAMES: Array<{
  title: string;
  genre: string;
  hook: string;
  cast: string;
  face: string;
  faceName: string;
  tone: CardTone;
  isLive: boolean;
  order: string;
  story: [string, string];
}> = [
  {
    title: '아빠 전쟁',
    genre: '한 손 슬링 액션',
    hook: '아들 한마디에, 아빠가 날아간다!',
    cast: '주인공 · 칠석 · 만수',
    face: 'assets/face-dad.webp',
    faceName: '칠석',
    tone: 'yellow',
    isLive: true,
    order: '첫 번째로 만나요',
    story: [
      '만수의 장난에 학교로 달려온 칠석. 학부모들로 북적이는 복도에서 엉뚱한 대소동이 시작됩니다.',
      '당겨서 발사하고 공중에서 한 번 더 돌진하는 액션. 벽과 사물함을 연결해 연쇄 충돌을 노립니다.',
    ],
  },
  {
    title: '만수 사고쳤다!',
    genre: '코믹 물리 퍼즐',
    hook: '엄마 오기 전에, 어떻게든 수습하자.',
    cast: '주인공 · 만수',
    face: 'assets/face-mansu.webp',
    faceName: '만수',
    tone: 'green',
    isLive: false,
    order: '다음 이야기 후보',
    story: [
      '공 한 번 찼을 뿐인데 화분부터 빨래까지 난리! 만수는 사고를 감추려다가 더 큰 사고를 만듭니다.',
      '집 안의 물건과 도구를 조합해 짧은 시간 안에 사고를 수습하는 퍼즐을 구상하고 있습니다.',
    ],
  },
  {
    title: '수진네 한 끼',
    genre: '따뜻한 식당 운영',
    hook: '오늘도, 네 자리의 밥을 차립니다.',
    cast: '주인공 · 수진 · 온 가족',
    face: 'assets/face-mom.webp',
    faceName: '수진',
    tone: 'orange',
    isLive: false,
    order: '다음 이야기 후보',
    story: [
      '가족을 위해 작은 밥집을 연 수진. 장보기부터 배달까지 칠석·철수·만수가 하나씩 힘을 보탭니다.',
      '주문·요리·서빙을 연결하고 주방 동선을 다듬는 한 손 운영 게임을 구상하고 있습니다.',
    ],
  },
  {
    title: '철수의 완벽한 하루',
    genre: '형제 협동 퍼즐',
    hook: '내 계획에 동생은 없었는데?',
    cast: '주인공 · 철수 · 만수',
    face: 'assets/face-cheolsu.webp',
    faceName: '철수',
    tone: 'blue',
    isLive: false,
    order: '후속 구상',
    story: [
      '시험 전날, 만수를 맡게 된 철수. 분 단위 계획은 무너지고 형제는 서로에게 없는 재주를 발견합니다.',
      '철수의 정확한 계획과 만수의 즉흥 행동을 번갈아 활용하는 퍼즐을 구상하고 있습니다.',
    ],
  },
  {
    title: '칠석은 출근 중',
    genre: '생활 액션 미니게임',
    hook: '오늘도 일단, 아빠는 나갑니다.',
    cast: '주인공 · 칠석',
    face: 'assets/face-dad.webp',
    faceName: '칠석',
    tone: 'yellow',
    isLive: false,
    order: '후속 구상',
    story: [
      '희망퇴직 뒤 이삿짐·배달·시장일을 가리지 않는 칠석. 서툴고 고된 하루에도 가족과의 약속은 챙기고 싶습니다.',
      '짐의 무게와 균형을 다루며 여러 일감을 해결하는 생활 액션을 구상하고 있습니다.',
    ],
  },
  {
    title: '그해, 칠석과 수진',
    genre: '짧은 이야기 모음',
    hook: '아빠와 엄마도, 처음엔 선후배였습니다.',
    cast: '주인공 · 칠석 · 수진',
    face: 'assets/face-mom.webp',
    faceName: '수진',
    tone: 'green',
    isLive: false,
    order: '특별편 구상',
    story: [
      '학교에서 만난 두 사람의 축제 준비, 취업, 첫 월급. 가족이 되기 전 칠석과 수진의 작은 순간들을 따라갑니다.',
      '짧은 협동 미니게임으로 만나는 과거 특별편을 구상하고 있습니다. 독립 게임 여부는 아직 미정입니다.',
    ],
  },
];

const PLAY_NOTES = [
  {
    title: '당겨서, 날리기.',
    body: '손을 놓는 순간 아빠가 날아갑니다. 벽과 상대를 잇는 각도를 찾아보세요.',
  },
  {
    title: '공중에서, 한 번 더.',
    body: '비행 중 원하는 방향을 탭하세요. 추가 돌진으로 흐름을 바꿀 수 있습니다.',
  },
  {
    title: '우리 아빠의 다음 도전.',
    body: '스테이지를 깨고, 별을 모으고, 오늘의 도전에 다시 나서세요.',
  },
];

const STUDIO_FACTS = [
  {label: '스튜디오', value: '파랑버섯 스튜디오'},
  {label: '우리가 하는 일', value: '모바일 게임 개발과 서비스'},
  {label: '함께하는 곳', value: '대한민국 · Republic of Korea'},
];

function SiteNav() {
  return (
    <TopNav
      label="주요 메뉴"
      heading={
        <TopNavHeading
          logo={<img src="assets/logo-mushroom.svg" width={28} height={28} alt="" />}
          heading="파랑버섯 스튜디오"
          headingHref="#p1"
        />
      }
      startContent={
        <>
          <TopNavItem label="우리의 이야기" href="#p2" />
          <TopNavItem label="출시 예정작" href="#p3" />
          <TopNavItem label="아빠 전쟁" href="#dadwar" />
          <TopNavItem label="연락하기" href="#p5" />
          <TopNavItem label="EN" href="#p6" />
        </>
      }
    />
  );
}

function Cover() {
  return (
    <VStack gap={10} id="p1">
      <VStack gap={6} hAlign="center">
        <VStack gap={3} hAlign="center">
          <Token label="함께라서, 참 좋은 날" color="green" />
          <Heading level={1} type="display-2" justify="center" textWrap="balance">
            두런두런, 우리의 이야기.
          </Heading>
          <Text type="large" color="secondary" justify="center" textWrap="balance">
            아빠 칠석, 엄마 수진, 형 철수와 막내 만수. 함께 웃고 떠드는 날들을 오래
            남깁니다.
          </Text>
        </VStack>
        <HStack gap={3} wrap="wrap" justify="center">
          <Button
            label="우리 가족 이야기 읽기"
            variant="primary"
            size="lg"
            href="#p2"
            endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
          />
          <Button label="지금 만드는 게임 살펴보기" variant="secondary" size="lg" href="#dadwar" />
        </HStack>
      </VStack>
      <Section variant="transparent" padding={0}>
        <VStack gap={4}>
          <Card padding={0}>
            <AspectRatio ratio={3 / 2} fit="cover">
              <img
                src="assets/game-family.webp"
              width={1536}
              height={1024}
              fetchPriority="high"
                alt="왼쪽부터 아빠 칠석, 형 철수, 막내 만수, 엄마 수진이 함께 웃으며 나란히 서 있는 가족사진"
              />
            </AspectRatio>
          </Card>
          <Grid columns={4} gap={2}>
            {PHOTO_ORDER.map(person => (
              <VStack key={person.name} gap={0.5} hAlign="center">
                <Text type="supporting">{person.role}</Text>
                <Text type="large" weight="bold">
                  {person.name}
                </Text>
              </VStack>
            ))}
          </Grid>
        </VStack>
      </Section>
    </VStack>
  );
}

function Origin() {
  return (
    <VStack gap={8} id="p2">
      <Grid columns={{minWidth: 320, max: 2}} gap={8}>
        <VStack gap={3}>
          <Text type="label" color="accent">
            우리의 시작
          </Text>
          <Heading level={2} textWrap="balance">
            가족이라는 가장 가까운 이야기.
          </Heading>
        </VStack>
        <VStack gap={4}>
          <Text type="large" as="p" display="block" weight="semibold">
            두런두런 나눈 말들이 하나의 이야기가 되었습니다.
          </Text>
          <Text as="p" display="block">
            어릴 때부터 가족과 사이가 참 좋았습니다. 함께한 시간을 돌아볼수록, 이 마음을
            오래오래 남겨 두고 싶다는 생각이 들었습니다.
          </Text>
          <Text as="p" display="block">
            파랑버섯 스튜디오는 그 마음에서 출발했습니다. 누군가에게는 웃음이 되고,
            누군가에게는 가까운 사람을 떠올리게 하는 게임을 만듭니다.
          </Text>
          <Text type="supporting" as="p" display="block">
            파랑버섯 스튜디오
          </Text>
        </VStack>
      </Grid>
      <Grid columns={{minWidth: 240, max: 3}} gap={4}>
        {VALUES.map(value => (
          <Card key={value.word} variant="muted">
            <VStack gap={2}>
              <Text type="label" color="accent">
                {value.word}
              </Text>
              <Heading level={3}>{value.title}</Heading>
              <Text color="secondary">{value.body}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
      <Grid columns={{minWidth: 220, max: 4}} gap={4}>
        {FAMILY.map(person => (
          <Card key={person.name}>
            <VStack gap={3}>
              <Avatar src={person.face} name={`${person.role} ${person.name}`} size={96} tooltip={false} />
              <Heading level={3}>
                {person.role} {person.name}
              </Heading>
              <Text color="secondary">{person.about}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}

function Lineup() {
  return (
    <VStack gap={8} id="p3">
      <VStack gap={3}>
        <Text type="label" color="accent">
          칠석네 가족의 다음 대소동
        </Text>
        <Heading level={2} textWrap="balance">
          한 가족, 여섯 가지 이야기.
        </Heading>
        <Text type="large" color="secondary">
          아빠도, 엄마도, 형도, 막내도. 이번엔 누가 주인공일까요?
        </Text>
      </VStack>
      <Grid columns={{minWidth: 300, max: 3}} gap={4}>
        {GAMES.map(game => (
          <Card key={game.title} variant={game.tone}>
            <VStack gap={4}>
              <HStack gap={3} justify="between" vAlign="center">
                <Token
                  label={game.isLive ? '개발 중' : '출시 예정 · 기획 중'}
                  color={game.isLive ? 'green' : 'gray'}
                />
                <Avatar src={game.face} name={game.faceName} size={60} tooltip={false} />
              </HStack>
              <VStack gap={2}>
                <Text type="supporting">{game.genre}</Text>
                <Heading level={3}>{game.title}</Heading>
                <Text weight="semibold">{game.hook}</Text>
                <Text type="supporting">{game.cast}</Text>
              </VStack>
              <Collapsible trigger="어떤 이야기인가요?" defaultIsOpen={false}>
                <VStack gap={2}>
                  <Text as="p" display="block">
                    {game.story[0]}
                  </Text>
                  <Text as="p" display="block">
                    {game.story[1]}
                  </Text>
                </VStack>
              </Collapsible>
              {game.isLive ? (
                <Button
                  label="지금 만드는 게임 살펴보기"
                  variant="secondary"
                  href="#dadwar"
                  endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
                />
              ) : null}
              <Text type="supporting">{game.order}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
      <Card variant="muted">
        <VStack gap={2}>
          <Text weight="semibold">
            지금 아빠 전쟁 개발 → 다음 만수·수진 이야기 검토 → 그다음 가족의 다른 이야기
          </Text>
          <Text type="supporting">
            출시일은 아직 정해지지 않았습니다. 후속작 제목과 제작 순서는 개발 과정에서 달라질 수
            있습니다.
          </Text>
        </VStack>
      </Card>
    </VStack>
  );
}

function DadWar() {
  return (
    <Card variant="green" padding={8} id="dadwar">
      <Grid columns={{minWidth: 300, max: 2}} gap={8} align="center">
        <VStack gap={5}>
          <VStack gap={3} hAlign="start">
            <Token label="개발 중 · Android" color="green" />
            <Text type="label" color="secondary">
              우리 아빠가 주인공이라면?
            </Text>
            <Heading level={2} type="display-3">
              아빠 전쟁
            </Heading>
            <Text type="large" weight="semibold">
              아들 한마디에, 아빠가 날아간다.
            </Text>
            <Text color="secondary">
              아들의 장난에 학교로 달려온 아빠. 다른 아빠들과 마주친 복도는 어느새 전쟁터!
              당기고, 날리고, 한 번 더 돌진하세요.
            </Text>
          </VStack>
          <HStack gap={3} wrap="wrap">
            <Button
              label="어떻게 플레이하나요?"
              variant="primary"
              size="lg"
              href="#p4"
              endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
            />
            <Button
              label="테스트 버전 보기"
              variant="secondary"
              size="lg"
              href={TEST_BUILD_URL}
              target="_blank"
              rel="noopener noreferrer"
              endContent={<Icon icon={ArrowTopRightOnSquareIcon} size="sm" color="inherit" />}
            />
          </HStack>
          <Text type="supporting">
            정식 출시 전 테스트 단계입니다. 기기 호환성과 플레이 경험을 다듬고 있습니다.
          </Text>
        </VStack>
        <Card padding={0} width="100%" maxWidth={420}>
          <AspectRatio ratio={641 / 1100} fit="cover">
            <img
              src="assets/keyart-dad.jpg"
            width={641}
            height={1100}
            loading="lazy"
              alt="아들을 위해 학교로 달려가는 아빠 전쟁의 주인공"
            />
          </AspectRatio>
        </Card>
      </Grid>
    </Card>
  );
}

function Play() {
  return (
    <Grid columns={{minWidth: 300, max: 2}} gap={8} align="center" id="p4">
      <VStack gap={6}>
        <VStack gap={3}>
          <Text type="label" color="accent">
            한 손으로 펼치는 대소동
          </Text>
          <Heading level={2} textWrap="balance">
            짧게 즐기고, 한 판 더.
          </Heading>
        </VStack>
        <VStack gap={4}>
          {PLAY_NOTES.map((note, index) => (
            <VStack key={note.title} gap={4}>
              {index > 0 ? <Divider /> : null}
              <VStack gap={1}>
                <Heading level={3}>
                  {index + 1}. {note.title}
                </Heading>
                <Text color="secondary">{note.body}</Text>
              </VStack>
            </VStack>
          ))}
        </VStack>
      </VStack>
      <VStack gap={2} hAlign="center">
        <Card padding={0} width="100%" maxWidth={360}>
          <AspectRatio ratio={9 / 16} fit="cover">
            <img
              src="assets/shot-flight.jpg"
            width={720}
            height={1280}
            loading="lazy"
              alt="학교 복도에서 아빠가 상대를 향해 날아가는 실제 개발 중 게임 화면"
            />
          </AspectRatio>
        </Card>
        <Text type="supporting">개발 중 화면입니다.</Text>
      </VStack>
    </Grid>
  );
}

function Contact() {
  return (
    <Card variant="muted" padding={8} id="p5">
      <Grid columns={{minWidth: 300, max: 2}} gap={8}>
        <VStack gap={3}>
          <Text type="label" color="accent">
            다음 이야기를 함께
          </Text>
          <Heading level={2} textWrap="balance">
            우리의 다음 장에, 당신을 초대합니다.
          </Heading>
          <Text color="secondary">
            게임 이야기, 협업 제안, 짧은 인사까지. 보내 주신 이야기를 기다립니다.
          </Text>
        </VStack>
        <VStack gap={5} hAlign="start">
          <Button
            label={CONTACT}
            variant="primary"
            size="lg"
            href={`mailto:${CONTACT}`}
            icon={<Icon icon={EnvelopeIcon} color="inherit" />}
          />
          <VStack gap={2}>
            {STUDIO_FACTS.map(fact => (
              <HStack key={fact.label} gap={3} wrap="wrap">
                <Text color="secondary">{fact.label}</Text>
                <Text weight="semibold">{fact.value}</Text>
              </HStack>
            ))}
          </VStack>
          <Button
            label="아빠 전쟁 개인정보 처리방침"
            variant="secondary"
            size="lg"
            href={PRIVACY_URL}
            endContent={<Icon icon={ArrowTopRightOnSquareIcon} size="sm" color="inherit" />}
          />
        </VStack>
      </Grid>
    </Card>
  );
}

// 영어 구역은 화면 낭독기가 영어로 읽도록 언어를 표시한다. 부품에 해당 속성이 없어 감싸는 요소로 넣는다.
function EnglishRegion(props: ComponentProps<'section'>) {
  return <section lang="en" {...props} />;
}

function English() {
  return (
    <VStack as={EnglishRegion} gap={3} id="p6" maxWidth={720}>
      <Text type="label" color="accent">
        A little afterword
      </Text>
      <Heading level={2} textWrap="balance">
        Some things deserve to stay with us.
      </Heading>
      <Text as="p" display="block" color="secondary">
        We have always been close to our family. Bluemushroom studio began with a simple
        wish: to keep those memories alive, for a long, long time. We turn that affection
        into stories and games.
      </Text>
      <Text as="p" display="block" color="secondary">
        Our first game, Dad War, is a one-handed casual action game for Android, currently
        in development.
      </Text>
    </VStack>
  );
}

function Footer() {
  return (
    <VStack gap={4}>
      <Divider />
      <HStack gap={3} justify="between" vAlign="center" wrap="wrap">
        <VStack gap={1}>
          <Text weight="semibold">가족이라는 이야기, 게임으로 오래 남기다.</Text>
          <Text type="supporting">© 2026 Bluemushroom studio</Text>
        </VStack>
        <Button
          label="맨 위로"
          variant="ghost"
          size="lg"
          href="#p1"
          icon={<Icon icon={ArrowUpIcon} color="inherit" />}
        />
      </HStack>
    </VStack>
  );
}

export default function Home() {
  // 한 페이지 안에서 자리만 옮기는 링크라서, 메뉴 서랍은 직접 닫아 줘야 한다.
  const [isNavOpen, setIsNavOpen] = useState(false);
  useEffect(() => {
    const closeOnAnchor = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a[href^="#"]')) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener('click', closeOnAnchor);
    return () => document.removeEventListener('click', closeOnAnchor);
  }, []);

  // 내용을 스크립트로 그리기 때문에, 주소에 자리 표시가 붙어 들어오면(처리방침 페이지의 메뉴 등)
  // 브라우저가 처음에 그 자리를 찾지 못한다. 그린 뒤에 직접 옮겨 준다.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
      return;
    }
    // 처음 들어올 때는 미끄러지듯 가지 않고 바로 그 자리에서 시작한다.
    const jump = () => document.getElementById(id)?.scrollIntoView({behavior: 'instant'});
    jump();
    // 글꼴이 늦게 바뀌면 줄 높이가 달라져 자리가 조금 밀리므로 한 번 더 맞춘다.
    void document.fonts.ready.then(() => {
      if (decodeURIComponent(window.location.hash.slice(1)) === id) {
        jump();
      }
    });
  }, []);

  return (
    <AppShell
      height="auto"
      variant="surface"
      topNav={<SiteNav />}
      mobileNav={{isOpen: isNavOpen, onOpenChange: setIsNavOpen}}>
      <Layout
        height="auto"
        contentWidth={1200}
        content={
          <LayoutContent padding={6} isScrollable={false}>
            <VStack gap={10}>
              <Cover />
              <Origin />
              <Lineup />
              <DadWar />
              <Play />
              <Contact />
              <English />
              <Footer />
            </VStack>
          </LayoutContent>
        }
      />
    </AppShell>
  );
}
