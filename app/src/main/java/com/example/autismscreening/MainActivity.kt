package com.example.autismscreening

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.autismscreening.ui.theme.AutismScreeningTheme
import kotlin.math.roundToInt

enum class AssessmentType {
    CARS,
    ADOS2,
    MCHAT
}

data class AssessmentResult(
    val title: String,
    val total: Double,
    val category: String,
    val summary: String
)

data class Question(
    val id: String,
    val text: String,
    val options: List<String>
)

val carsQuestions = listOf(
    Question("C1", "Relates to people", listOf("1", "2", "3", "4")),
    Question("C2", "Imitates others", listOf("1", "2", "3", "4")),
    Question("C3", "Emotional response", listOf("1", "2", "3", "4")),
    Question("C4", "Body use", listOf("1", "2", "3", "4")),
    Question("C5", "Object use", listOf("1", "2", "3", "4")),
    Question("C6", "Adaptation to change", listOf("1", "2", "3", "4")),
    Question("C7", "Visual response", listOf("1", "2", "3", "4")),
    Question("C8", "Listening response", listOf("1", "2", "3", "4")),
    Question("C9", "Taste, smell, touch response", listOf("1", "2", "3", "4")),
    Question("C10", "Fear or nervousness", listOf("1", "2", "3", "4")),
    Question("C11", "Verbal communication", listOf("1", "2", "3", "4")),
    Question("C12", "Nonverbal communication", listOf("1", "2", "3", "4")),
    Question("C13", "Activity level", listOf("1", "2", "3", "4")),
    Question("C14", "Level and consistency of intellectual response", listOf("1", "2", "3", "4")),
    Question("C15", "General impressions", listOf("1", "2", "3", "4"))
)

val adosQuestions = listOf(
    Question("A1", "Reciprocal social interaction", listOf("0", "1", "2")),
    Question("A2", "Shared enjoyment", listOf("0", "1", "2")),
    Question("A3", "Joint attention", listOf("0", "1", "2")),
    Question("A4", "Social reciprocity", listOf("0", "1", "2")),
    Question("A5", "Communication demand", listOf("0", "1", "2")),
    Question("A6", "Gesture use", listOf("0", "1", "2")),
    Question("A7", "Response to name", listOf("0", "1", "2")),
    Question("A8", "Eye contact", listOf("0", "1", "2")),
    Question("A9", "Restricted repetitive behavior", listOf("0", "1", "2")),
    Question("A10", "Sensory behavior", listOf("0", "1", "2")),
    Question("A11", "Play behavior", listOf("0", "1", "2")),
    Question("A12", "Imagination / pretend play", listOf("0", "1", "2"))
)

val mchatQuestions = listOf(
    Question("M1", "Does your child enjoy being swung or bounced?", listOf("Yes", "No")),
    Question("M2", "Does your child take an interest in other children?", listOf("Yes", "No")),
    Question("M3", "Does your child pretend to be talking on the phone or pretend to feed a doll?", listOf("Yes", "No")),
    Question("M4", "Does your child point to show you things?", listOf("Yes", "No")),
    Question("M5", "Does your child follow your gaze when you point?", listOf("Yes", "No")),
    Question("M6", "Does your child make eye contact?", listOf("Yes", "No")),
    Question("M7", "Does your child respond to their name?", listOf("Yes", "No")),
    Question("M8", "Does your child smile to get attention?", listOf("Yes", "No")),
    Question("M9", "Does your child imitate you?", listOf("Yes", "No")),
    Question("M10", "Does your child understand what people say?", listOf("Yes", "No")),
    Question("M11", "Does your child use gestures like pointing or waving?", listOf("Yes", "No")),
    Question("M12", "Does your child seem to be in their own world?", listOf("Yes", "No")),
    Question("M13", "Does your child show unusual repetitive behaviors?", listOf("Yes", "No")),
    Question("M14", "Does your child show concern for others?", listOf("Yes", "No")),
    Question("M15", "Does your child show interest in toys or objects?", listOf("Yes", "No")),
    Question("M16", "Does your child bring things to show you?", listOf("Yes", "No"))
)

fun scoreCars(answers: Map<String, Int>): AssessmentResult {
    val total = answers.values.sum().toDouble()
    val category = when {
        total <= 27.5 -> "Low concern"
        total <= 33.5 -> "Moderate concern"
        total <= 36.5 -> "High concern"
        else -> "Very high concern"
    }
    val summary = """
        CARS score is an indicator of autistic traits and should be used with clinical judgment.
        Screening interpretation:
        - 15-27.5: lower concern
        - 28-33.5: moderate concern
        - 34-36.5: high concern
        - 37-60: very high concern
    """.trimIndent()
    return AssessmentResult("CARS", total, category, summary)
}

fun scoreAdos(answers: Map<String, Int>): AssessmentResult {
    val total = answers.values.sum().toDouble()
    val category = when {
        total <= 9 -> "Low concern"
        total <= 17 -> "Moderate concern"
        else -> "High concern"
    }
    val summary = """
        ADOS-2 structured screening is not a standalone diagnosis.
        It is intended for clinician-guided evaluation and module-specific interpretation.
    """.trimIndent()
    return AssessmentResult("ADOS-2", total, category, summary)
}

fun scoreMchat(answers: Map<String, Boolean>): AssessmentResult {
    val total = answers.values.count { it }.toDouble()
    val category = when {
        total <= 2 -> "Low risk"
        total <= 7 -> "Moderate risk"
        else -> "High risk"
    }
    val summary = """
        M-CHAT risk categories are screening indicators and should not replace a clinical diagnosis.
        Common interpretation:
        - 0-2: low risk
        - 3-7: moderate risk
        - 8+: high risk
    """.trimIndent()
    return AssessmentResult("M-CHAT", total, category, summary)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AutismScreeningTheme {
                AutismScreeningApp()
            }
        }
    }
}

@Composable
fun AutismScreeningApp() {
    var selectedAssessment by remember { mutableStateOf(AssessmentType.CARS) }
    val carsAnswers = remember { mutableStateMapOf<String, Int>() }
    val adosAnswers = remember { mutableStateMapOf<String, Int>() }
    val mchatAnswers = remember { mutableStateMapOf<String, Boolean>() }

    val result = when (selectedAssessment) {
        AssessmentType.CARS -> scoreCars(carsAnswers)
        AssessmentType.ADOS2 -> scoreAdos(adosAnswers)
        AssessmentType.MCHAT -> scoreMchat(mchatAnswers)
    }

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Text(
                text = "Autism Screening Assistant",
                fontSize = 26.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(12.dp))

            androidx.compose.material3.AssistChip(
                onClick = { },
                label = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        androidx.compose.material3.Icon(
                            imageVector = Icons.Default.Info,
                            contentDescription = null
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Screening only; not a diagnosis")
                    }
                }
            )

            Spacer(modifier = Modifier.height(16.dp))

            AssessmentTabs(selectedAssessment) { selectedAssessment = it }

            Spacer(modifier = Modifier.height(20.dp))

            when (selectedAssessment) {
                AssessmentType.CARS -> {
                    IntQuestionList(
                        questions = carsQuestions,
                        answers = carsAnswers,
                        onAnswer = { id, value -> carsAnswers[id] = value }
                    )
                }

                AssessmentType.ADOS2 -> {
                    IntQuestionList(
                        questions = adosQuestions,
                        answers = adosAnswers,
                        onAnswer = { id, value -> adosAnswers[id] = value }
                    )
                }

                AssessmentType.MCHAT -> {
                    BooleanQuestionList(
                        questions = mchatQuestions,
                        answers = mchatAnswers,
                        onAnswer = { id, value -> mchatAnswers[id] = value }
                    )
                }
            }

            Spacer(modifier = Modifier.height(20.dp))
            ResultCard(result)
        }
    }
}

@Composable
fun AssessmentTabs(
    selected: AssessmentType,
    onSelect: (AssessmentType) -> Unit
) {
    val tabs = listOf(
        "CARS" to AssessmentType.CARS,
        "ADOS-2" to AssessmentType.ADOS2,
        "M-CHAT" to AssessmentType.MCHAT
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        tabs.forEach { (label, assessmentType) ->
            FilterChip(
                selected = selected == assessmentType,
                onClick = { onSelect(assessmentType) },
                label = { Text(label) }
            )
        }
    }
}

@Composable
fun IntQuestionList(
    questions: List<Question>,
    answers: MutableMap<String, Int>,
    onAnswer: (String, Int) -> Unit
) {
    questions.forEachIndexed { index, question ->
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 6.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(
                modifier = Modifier.padding(12.dp)
            ) {
                Text("${index + 1}. ${question.text}", fontWeight = FontWeight.Medium)
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    question.options.forEach { option ->
                        val value = option.toInt()
                        val isSelected = answers[question.id] == value
                        Button(
                            onClick = { onAnswer(question.id, value) },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surface,
                                contentColor = if (isSelected) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurface
                            )
                        ) {
                            Text(option)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun BooleanQuestionList(
    questions: List<Question>,
    answers: MutableMap<String, Boolean>,
    onAnswer: (String, Boolean) -> Unit
) {
    questions.forEachIndexed { index, question ->
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 6.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(
                modifier = Modifier.padding(12.dp)
            ) {
                Text("${index + 1}. ${question.text}", fontWeight = FontWeight.Medium)
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    listOf(true, false).forEach { boolValue ->
                        val label = if (boolValue) "Yes" else "No"
                        val selected = answers[question.id] == boolValue
                        Button(
                            onClick = { onAnswer(question.id, boolValue) },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surface,
                                contentColor = if (selected) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurface
                            )
                        ) {
                            Text(label)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ResultCard(result: AssessmentResult) {
    val accentColor = when (result.category) {
        "Low concern", "Low risk" -> Color(0xFF2E7D32)
        "Moderate concern", "Moderate risk" -> Color(0xFFFFA000)
        "High concern", "High risk" -> Color(0xFFD32F2F)
        "Very high concern" -> Color(0xFFB71C1C)
        else -> MaterialTheme.colorScheme.primary
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = accentColor.copy(alpha = 0.12f))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                androidx.compose.material3.Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = accentColor
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "${result.title} Result",
                    fontWeight = FontWeight.Bold,
                    fontSize = 20.sp
                )
            }

            Spacer(modifier = Modifier.height(12.dp))
            Text(text = "Total score: ${result.total.roundToInt()}", fontWeight = FontWeight.Bold)
            Text(text = "Category: ${result.category}", fontWeight = FontWeight.SemiBold, color = accentColor)
            Spacer(modifier = Modifier.height(10.dp))
            Text(text = result.summary, lineHeight = 22.sp)
        }
    }
}
