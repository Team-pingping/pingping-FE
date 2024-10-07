# 🛠️ 프론트엔드 개발 규칙

본 문서는 프론트엔드 개발팀을 위한 규칙과 가이드라인을 다룹니다. 프론트엔드와 백엔드 팀이 함께 준수해야 할 **공통 사항**과 프론트엔드 팀만의 **특화된 규칙**을 모두 포함하고 있습니다.

---

# 👍 공통 사항

- issue 생성 및 PR을 통해 본인이 구현한 부분에 대한 기록을 남겨야 합니다.
- 예외처리는 항상 잘 만들어두기 (code, message, data)
- 개발 기간 : 9/30 ~ 11/24
- 스프린트 (3일간격) 진행 (해올 것을 정해서 해오기)

- 수요일, 토요일

- 단위 테스트 작성(service 메소드 별로) : Kotest 사용
- 다른 사람이 알아보기 쉽도록 주석처리해야 합니다. (controller, service 메서드마다)
    - javadoc 형식 https://jake-seo-dev.tistory.com/59
- issue 생성 및 PR을 통해 본인이 구현한 부분에 대한 기록을 남겨야 합니다.
- 테스트 및 원할한 서버 운영을 위한 로그를 작성해야 합니다.(에러나 운영에 필요한 로그. 검색시 검색어와 같은 로그)
- 예외처리는 항상 잘 만들어두기 (code, message, data)
- 개발 기간 : 9/30 ~ 11/24
- 스프린트 (3일간격) 진행 (해올 것을 정해서 해오기)
    - 수요일, 토요일

---

# 🛠️ 기술 스택

## Language, Framework, Library

- **Next.js**: 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하여 페이지 로딩 속도와 SEO를 최적화합니다. 이를 통해 웹 애플리케이션의 성능과 사용자 경험을 크게 향상시킬 수 있습니다.
- **TypeScript**: 강력한 타입 검사와 정적 타입 체킹을 제공하여, 개발 중 발생할 수 있는 런타임 오류를 사전에 방지하고 코드의 전반적인 품질을 높입니다. Next.js와의 통합을 통해 오류를 조기에 감지하고, 대규모 코드베이스의 관리를 용이하게 해줍니다.
- **React**: UI 라이브러리로, 컴포넌트 기반 아키텍처를 통해 재사용 가능한 UI를 구축할 수 있으며, Next.js와 함께 서버 및 클라이언트에서 효율적으로 렌더링을 처리할 수 있습니다.
- **CSS/SCSS**: 주로 **Tailwind CSS**를 사용하여 스타일링을 처리하지만, 복잡한 커스터마이징이나 특수한 스타일링 요구사항에 대응하기 위해 여전히 CSS/SCSS가 사용될 수 있습니다. Tailwind CSS는 유틸리티 클래스를 통해 신속하고 효율적인 스타일링을 가능하게 하지만, 프로젝트에 따라 CSS나 SCSS로 보완해야 할 때도 있습니다.
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크로, 미리 정의된 클래스를 사용해 직관적이고 빠른 스타일링이 가능합니다. 별도의 CSS 파일 없이 HTML에서 직접 스타일을 적용할 수 있어 개발 생산성을 극대화하며, 필요 시 커스터마이징이 용이합니다.
- **ESLint**와 **Prettier**: 코드 스타일을 자동으로 검사하고 일관성을 유지하며, 코드의 품질과 가독성을 높여줍니다.
- **Husky**: Git hooks를 활용해 코드 푸시 시 자동으로 코드 검사를 실행하여 협업 중 코드 품질을 보장합니다.

---

## CICD

- **Vercel**: Vercel의 CI/CD 파이프라인은 자동화된 빌드 및 배포를 제공하여 개발 효율성을 극대화합니다. 간단한 설정으로 코드 변경 사항이 실시간으로 배포되며, Next.js 애플리케이션 배포에 최적화된 환경을 제공합니다.

---

## Branch Naming Rule

branch는 작업 단위 & 기능 단위로 생성된 issue를 기반으로 합니다. 그러나 작은 수정 작업은 이슈 없이도 브랜치를 생성할 수 있습니다.

- **Branch Naming Rule**:
    1. **기능 개발 또는 중요한 작업**: 이슈를 먼저 생성하고 브랜치를 작성합니다. 이슈 번호와 작업의 도메인을 조합하여 브랜치 이름을 정합니다.
        - 예: `feature/25-ui-component`
    2. **작은 수정 작업**: 문서 수정, 간단한 스타일링 변경 등 사소한 작업은 이슈 없이도 브랜치를 생성할 수 있습니다.
        - 예: `docs/update-readme`, `style/update-button-styles`
    
    **Prefix 설명**:
    
    - `feature`: 새로운 기능을 개발할 때 사용합니다.
    - `bugfix`: 버그를 수정할 때 사용합니다.
    - `docs`: 문서를 수정할 때 사용합니다.
    - `config`: 설정 파일 또는 환경 구성을 변경할 때 사용합니다.

---

## File Naming Rule

- **파일명 규칙**: 파일 및 폴더 이름은 일관된 네이밍을 유지해야 하며, 팀원 간 파일명을 쉽게 인식할 수 있도록 해야 합니다.
    1. **컴포넌트 파일**:
        - 컴포넌트 파일명은 **PascalCase**를 사용합니다.
        - 예시: `Button.tsx`, `UserProfile.tsx`
    2. **일반 파일**:
        - 일반적인 유틸리티 함수, 설정 파일 등은 **camelCase**를 사용합니다.
        - 예시: `formatDate.ts`, `fetchData.ts`
    3. **폴더 이름**:
        - 폴더 이름은 **kebab-case**로 작성하며, 소문자만 사용합니다.
        - 예시: `user-profile/`, `button-styles/`
    4. **CSS/SCSS 파일**:
        - 스타일 파일은 **kebab-case**로 작성합니다.
        - 예시: `header-styles.scss`, `button.scss`

---
# Pull Request Naming Rule & Template

Pull Request 작성 시 PR 제목과 내용 모두 중요합니다. PR 제목은 작업의 간결한 설명을, 내용은 변경 사항에 대한 구체적인 설명을 담아야 합니다.

## Pull Request Naming Rule

- Pull Request: develop & main branch로 merge할 때에는 pull request가 필요합니다. PR 제목에는 간결하고 이해하기 쉬운 설명을 포함해야 합니다.
- Pull Request Naming Rule: `[<Prefix>] <Description>` 의 양식을 준수하되, prefix는 commit message convention과 일관성을 유지합니다.

### 예시:

1. 새로운 UI 컴포넌트 추가
   - Pull Request Title: `[feat] 새로운 버튼 컴포넌트 추가`
2. 환경 설정 파일 수정
   - Pull Request Title: `[chore] 환경 설정 파일 업데이트`
3. 버그 수정
   - Pull Request Title: `[fix] 드롭다운 메뉴 버그 수정`
4. 문서 수정 작업
   - Pull Request Title: `[docs] 프로젝트 README 업데이트`

---

## Pull Request Template

### 📄 Pull Request 템플릿

- **관련 이슈**: 작업한 이슈 번호를 명시합니다.
- **작업 내용**: 구현된 기능이나 변경 사항을 간략하게 설명합니다.
- **스크린샷**: 변경된 UI나 기능이 있다면, 스크린샷을 첨부합니다.
- **추가 사항**: 논의가 필요한 사항이 있으면 추가로 작성합니다.
- **리뷰 요구 사항(선택)**: 특별히 검토가 필요한 사항이 있으면 적어주세요.

---

## Commit Message Convention

`[<Prefix>] #<Issue_Number> <Description>` 의 양식을 준수합니다. 커밋 메시지는 코드 변경 사항을 명확하게 전달할 수 있도록 간결하고 구체적으로 작성해야 합니다.

- **feat**: 새로운 기능 추가
  - 예시: `[feat] #11 버튼 컴포넌트 구현`
- **fix**: 버그 수정
  - 예시: `[fix] #10 UI 렌더링 오류 수정`
- **docs**: 문서 수정
  - 예시: `[docs] #14 README 파일 업데이트`
- **style**: 코드 포맷팅, 세미콜론 누락 등 스타일 수정
  - 예시: `[style] #23 코드 포맷팅 적용`
- **refactor**: 코드 리팩토링 (기능 변화 없음)
  - 예시: `[refactor] #15 컴포넌트 구조 개선`
- **chore**: 기타 자잘한 수정 (빌드 스크립트 수정, 패키지 관리 등)
  - 예시: `[chore] #21 패키지 의존성 업데이트`
- **test**: 테스트 코드 추가 또는 수정
  - 예시: `[test] #18 버튼 컴포넌트 테스트 추가`
- **perf**: 성능 향상 관련 작업
  - 예시: `[perf] #20 렌더링 최적화 작업`
- **rename**: 파일 및 폴더명 수정
  - 예시: `[rename] #22 컴포넌트 파일명 수정`
- **enhancement**: 기존 기능의 개선 또는 새로운 기능 추가 (사용자 경험, 성능 등)
  - 예시: `[enhancement] #6 네이버 OAuth 로그인 기능 리팩토링`
---

## Issue 템플릿

### 🐛 Bug Report 템플릿

- **설명**: 버그에 대한 간단한 설명.
- **재현 방법**: 버그를 재현할 수 있는 단계별 설명.
- **예상 결과**: 기대했던 동작을 명시.
- **환경**: OS, 브라우저 등의 환경 정보.

### ✨ Feature Request 템플릿

- **설명**: 제안하는 기능에 대한 간략한 설명.
- **동기**: 이 기능이 필요한 이유.
- **예상되는 기능**: 예상되는 기능의 동작 방식 설명.

---

## 🙏 협업 툴

- **Slack**: 실시간 커뮤니케이션을 위한 협업 툴.
- **Notion**: 문서화, 일정 관리, 작업 관리를 위한 툴.
- **Gather**: 가상 오피스 환경에서 팀원들이 실시간 협업할 수 있는 툴.
