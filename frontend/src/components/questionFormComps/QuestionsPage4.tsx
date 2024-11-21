// import { QuestionsProps } from "../../interfaces/interfaces";
// import { frequencyArray, queryArray_page4 } from "../../utils/queryData";
// import { useRef } from "react";

// import TopBar from "./PercentBar";
// import { FocusNextInput } from "../../../helpers/Helpers";

// const QuestionsPage4: React.FC<QuestionsProps> = ({
//   getAnswersFromEachPage,
//   answers,
// }) => {
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   FocusNextInput(answers, inputRefs, [...queryArray_page4]);

//   return (
//     <div>
//       <TopBar percent={60} />
//       <div className="questionsWrapper">
//         {queryArray_page4.map((query, index) => (
//           <div
//             className={`questionWrapper transition-opacity duration-300 ${
//               answers[query.key] ? "opacity-50" : "opacity-100"
//             }`}
//             key={query.key}
//           >
//             <h3>
//               {index + 16}.{query.value}
//             </h3>
//             {frequencyArray.map((freq) => (
//               <label
//                 htmlFor={`${query.key}_option${freq.key}`}
//                 key={`${query.key}_option${freq.key}`}
//               >
//                 <input
//                   id={`${query.key}_option${freq.key}`}
//                   name={query.key}
//                   type="radio"
//                   value={freq.value}
//                   checked={answers[query.key] === freq.value}
//                   onChange={getAnswersFromEachPage}
//                   autoFocus={
//                     `${query.key}_option${freq.key}` === "q16_optionf1"
//                       ? true
//                       : false
//                   }
//                   required
//                   ref={(el) => (inputRefs.current[index] = el)}
//                 />
//                 <span>{freq.value}</span>
//               </label>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionsPage4;
