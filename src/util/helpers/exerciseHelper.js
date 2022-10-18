import { useGetExercisesQuery } from "../../services/exerciseService";

export function getExerciseInstanceInfo(exerciseInstance) {
  const { exerciseInfo } = useGetExercisesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      exerciseInfo: data?.find((e) => e._id === exerciseInstance.exercise),
    }),
  });
  return exerciseInfo;
}
