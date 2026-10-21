"""
HCI Mini Project Usability Figures Generator
Author: Dhiraj Shirse (VJTI Mumbai)
Generates high-resolution academic figures (Figure 7a, 7b, 7c, 7d) for the HCI report.
"""

import matplotlib.pyplot as plt
import numpy as np

# Set aesthetic styling
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#CCCCCC'
plt.rcParams['axes.linewidth'] = 0.8

def generate_figure_7a():
    """Figure 7a: Task Success Rates (Total vs Unaided)"""
    tasks = ['T1: NeuralEye', 'T2: Download CV', 'T3: Reveal Phone', 'T4: IJERT Paper', 'T5: VJTI CGPA', 'T6: Terminal']
    total_success = [100, 100, 100, 100, 100, 80]
    unaided_success = [100, 100, 100, 80, 100, 80]

    x = np.arange(len(tasks))
    width = 0.35

    fig, ax = plt.subplots(figsize=(9, 4.5), dpi=300)
    rects1 = ax.bar(x - width/2, total_success, width, label='Total Success (Assisted + Unaided)', color='#3B82F6')
    rects2 = ax.bar(x + width/2, unaided_success, width, label='Unaided Success', color='#93C5FD')

    ax.axhline(95, color='#EF4444', linestyle='--', linewidth=1.5, label='U1 Target Threshold (95%)')

    ax.set_ylabel('Success Rate (%)', fontsize=11, fontweight='bold')
    ax.set_title('Figure 7a. Benchmark Task Success Rate (N=5)', fontsize=13, fontweight='bold', pad=15)
    ax.set_xticks(x)
    ax.set_xticklabels(tasks, fontsize=9.5)
    ax.set_ylim(0, 115)
    ax.legend(frameon=True, loc='lower right', fontsize=9)

    for rect in rects1:
        h = rect.get_height()
        ax.annotate(f'{h}%', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 3),
                    textcoords="offset points", ha='center', va='bottom', fontsize=8.5, fontweight='bold')

    for rect in rects2:
        h = rect.get_height()
        ax.annotate(f'{h}%', xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 3),
                    textcoords="offset points", ha='center', va='bottom', fontsize=8.5)

    plt.tight_layout()
    plt.savefig('docs/figure_7a_task_success.png')
    plt.close()
    print("Saved docs/figure_7a_task_success.png")

def generate_figure_7b():
    """Figure 7b: Time on Task with Standard Deviation Error Bars"""
    tasks = ['T1: NeuralEye', 'T2: Download CV', 'T3: Reveal Phone', 'T4: IJERT Paper', 'T5: VJTI CGPA', 'T6: Terminal']
    mean_times = [8.4, 4.2, 5.8, 12.6, 6.1, 14.5]
    std_devs = [2.1, 1.4, 1.8, 4.3, 1.9, 5.2]

    fig, ax = plt.subplots(figsize=(9, 4.5), dpi=300)
    bars = ax.bar(tasks, mean_times, yerr=std_devs, capsize=5, color='#F39C12', edgecolor='#D68910', alpha=0.9, ecolor='#333333')

    ax.axhline(10.0, color='#E74C3C', linestyle='--', linewidth=1.5, label='Efficiency Benchmark Target (10.0s)')

    ax.set_ylabel('Time on Task (Seconds ± SD)', fontsize=11, fontweight='bold')
    ax.set_title('Figure 7b. Mean Time on Task with Standard Deviation (N=5)', fontsize=13, fontweight='bold', pad=15)
    ax.set_ylim(0, 24)
    ax.legend(frameon=True, loc='upper left', fontsize=9.5)

    for bar, m in zip(bars, mean_times):
        ax.annotate(f'{m:.1f}s', xy=(bar.get_x() + bar.get_width()/2, m + 0.5), xytext=(0, 15),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9, fontweight='bold')

    plt.tight_layout()
    plt.savefig('docs/figure_7b_time_on_task.png')
    plt.close()
    print("Saved docs/figure_7b_time_on_task.png")

def generate_figure_7c():
    """Figure 7c: SUS per Participant"""
    participants = ['P1\n(Novice/Mobile)', 'P2\n(Novice/Mobile)', 'P3\n(Recruiter/Laptop)', 'P4\n(Recruiter/Laptop)', 'P5\n(Expert/Workstation)']
    sus_scores = [85.0, 82.5, 90.0, 92.5, 87.5]

    fig, ax = plt.subplots(figsize=(9, 4.8), dpi=300)
    bars = ax.bar(participants, sus_scores, color='#10B981', edgecolor='#059669', width=0.55, alpha=0.9)

    ax.axhline(87.5, color='#047857', linestyle='-', linewidth=2.0, label='Study Mean SUS = 87.5 (Grade A+ "Excellent")')
    ax.axhline(80.0, color='#F59E0B', linestyle=':', linewidth=1.5, label='Project Target Threshold (U10 = 80.0)')
    ax.axhline(68.0, color='#EF4444', linestyle='--', linewidth=1.5, label='Industry Average Benchmark (68.0)')

    ax.set_ylabel('System Usability Scale (SUS) Score (0–100)', fontsize=11, fontweight='bold')
    ax.set_title('Figure 7c. Individual SUS Scores by Participant (N=5)', fontsize=13, fontweight='bold', pad=15)
    ax.set_ylim(0, 105)
    ax.legend(frameon=True, loc='lower right', fontsize=9)

    for bar in bars:
        h = bar.get_height()
        ax.annotate(f'{h:.1f}', xy=(bar.get_x() + bar.get_width()/2, h), xytext=(0, 4),
                    textcoords="offset points", ha='center', va='bottom', fontsize=9.5, fontweight='bold')

    plt.tight_layout()
    plt.savefig('docs/figure_7c_sus_scores.png')
    plt.close()
    print("Saved docs/figure_7c_sus_scores.png")

def generate_figure_7d():
    """Figure 7d: The 5 Es Ergonomic Evaluation Profile"""
    dimensions = ['Enjoyable (Pleasurable)', 'Easy to use (Friendly)', 'Error-free in use (Safe)', 'Efficient to use', 'Effective to use (Functional)']
    ratings = [9.8, 9.4, 9.0, 9.2, 9.6]

    fig, ax = plt.subplots(figsize=(9, 4.2), dpi=300)
    bars = ax.barh(dimensions, ratings, color='#EC4899', edgecolor='#DB2777', height=0.5, alpha=0.85)

    ax.axvline(8.5, color='#6366F1', linestyle='--', linewidth=1.8, label='U11 Planned Quality Threshold (8.5 / 10)')

    ax.set_xlabel('Participant Mean Rating (/10)', fontsize=11, fontweight='bold')
    ax.set_title('Figure 7d. The 5 Es Usability Engineering Profile (Lecture 1)', fontsize=13, fontweight='bold', pad=15)
    ax.set_xlim(0, 10.8)
    ax.legend(frameon=True, loc='lower left', fontsize=9.5)

    for bar, r in zip(bars, ratings):
        ax.annotate(f'{r:.1f} / 10', xy=(r - 0.9, bar.get_y() + bar.get_height()/2),
                    ha='center', va='center', color='white', fontsize=10, fontweight='bold')

    plt.tight_layout()
    plt.savefig('docs/figure_7d_the_5_es.png')
    plt.close()
    print("Saved docs/figure_7d_the_5_es.png")

if __name__ == '__main__':
    generate_figure_7a()
    generate_figure_7b()
    generate_figure_7c()
    generate_figure_7d()
    print("All HCI report figures generated successfully in docs/")
