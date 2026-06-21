export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      ai_runs: {
        Row: {
          completed_at: string | null;
          created_at: string;
          error_message: string | null;
          id: string;
          input_payload: Json;
          latency_ms: number | null;
          mission_id: string | null;
          model: string | null;
          onboarding_session_id: string | null;
          output_payload: Json;
          prompt_version: string | null;
          provider: string | null;
          requested_at: string;
          run_type: Database["public"]["Enums"]["ai_run_type"];
          status: Database["public"]["Enums"]["ai_run_status"];
          user_id: string | null;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          error_message?: string | null;
          id?: string;
          input_payload?: Json;
          latency_ms?: number | null;
          mission_id?: string | null;
          model?: string | null;
          onboarding_session_id?: string | null;
          output_payload?: Json;
          prompt_version?: string | null;
          provider?: string | null;
          requested_at?: string;
          run_type: Database["public"]["Enums"]["ai_run_type"];
          status?: Database["public"]["Enums"]["ai_run_status"];
          user_id?: string | null;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          error_message?: string | null;
          id?: string;
          input_payload?: Json;
          latency_ms?: number | null;
          mission_id?: string | null;
          model?: string | null;
          onboarding_session_id?: string | null;
          output_payload?: Json;
          prompt_version?: string | null;
          provider?: string | null;
          requested_at?: string;
          run_type?: Database["public"]["Enums"]["ai_run_type"];
          status?: Database["public"]["Enums"]["ai_run_status"];
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ai_runs_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ai_runs_onboarding_session_id_fkey";
            columns: ["onboarding_session_id"];
            isOneToOne: false;
            referencedRelation: "onboarding_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      app_events: {
        Row: {
          category: Database["public"]["Enums"]["event_category"];
          device_id: string | null;
          entity_id: string | null;
          entity_type: string | null;
          event_name: string;
          id: string;
          occurred_at: string;
          onboarding_session_id: string | null;
          properties: Json;
          user_id: string | null;
        };
        Insert: {
          category: Database["public"]["Enums"]["event_category"];
          device_id?: string | null;
          entity_id?: string | null;
          entity_type?: string | null;
          event_name: string;
          id?: string;
          occurred_at?: string;
          onboarding_session_id?: string | null;
          properties?: Json;
          user_id?: string | null;
        };
        Update: {
          category?: Database["public"]["Enums"]["event_category"];
          device_id?: string | null;
          entity_id?: string | null;
          entity_type?: string | null;
          event_name?: string;
          id?: string;
          occurred_at?: string;
          onboarding_session_id?: string | null;
          properties?: Json;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_events_device_id_fkey";
            columns: ["device_id"];
            isOneToOne: false;
            referencedRelation: "user_devices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_events_onboarding_session_id_fkey";
            columns: ["onboarding_session_id"];
            isOneToOne: false;
            referencedRelation: "onboarding_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_logs: {
        Row: {
          action: string;
          actor_user_id: string | null;
          category: Database["public"]["Enums"]["event_category"];
          created_at: string;
          entity_id: string | null;
          entity_type: string | null;
          id: string;
          payload: Json;
        };
        Insert: {
          action: string;
          actor_user_id?: string | null;
          category?: Database["public"]["Enums"]["event_category"];
          created_at?: string;
          entity_id?: string | null;
          entity_type?: string | null;
          id?: string;
          payload?: Json;
        };
        Update: {
          action?: string;
          actor_user_id?: string | null;
          category?: Database["public"]["Enums"]["event_category"];
          created_at?: string;
          entity_id?: string | null;
          entity_type?: string | null;
          id?: string;
          payload?: Json;
        };
        Relationships: [];
      };
      behavioral_choices: {
        Row: {
          behavioral_profile_id: string;
          created_at: string;
          id: string;
          option_key: string | null;
          option_text: string | null;
          position: number | null;
          scenario_key: string;
          scenario_title: string | null;
          situation: string | null;
          trait: string | null;
        };
        Insert: {
          behavioral_profile_id: string;
          created_at?: string;
          id?: string;
          option_key?: string | null;
          option_text?: string | null;
          position?: number | null;
          scenario_key: string;
          scenario_title?: string | null;
          situation?: string | null;
          trait?: string | null;
        };
        Update: {
          behavioral_profile_id?: string;
          created_at?: string;
          id?: string;
          option_key?: string | null;
          option_text?: string | null;
          position?: number | null;
          scenario_key?: string;
          scenario_title?: string | null;
          situation?: string | null;
          trait?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "behavioral_choices_behavioral_profile_id_fkey";
            columns: ["behavioral_profile_id"];
            isOneToOne: false;
            referencedRelation: "behavioral_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      behavioral_profiles: {
        Row: {
          created_at: string;
          id: string;
          insight: string | null;
          onboarding_session_id: string | null;
          patterns: string[];
          position: string | null;
          primary_risk: string | null;
          profile_payload: Json;
          source_scan_session_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          insight?: string | null;
          onboarding_session_id?: string | null;
          patterns?: string[];
          position?: string | null;
          primary_risk?: string | null;
          profile_payload?: Json;
          source_scan_session_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          insight?: string | null;
          onboarding_session_id?: string | null;
          patterns?: string[];
          position?: string | null;
          primary_risk?: string | null;
          profile_payload?: Json;
          source_scan_session_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "behavioral_profiles_onboarding_session_id_fkey";
            columns: ["onboarding_session_id"];
            isOneToOne: false;
            referencedRelation: "onboarding_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "behavioral_profiles_source_scan_session_id_fkey";
            columns: ["source_scan_session_id"];
            isOneToOne: false;
            referencedRelation: "scan_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar_events: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          ends_at: string | null;
          event_type: string;
          id: string;
          is_all_day: boolean;
          metadata: Json;
          mission_id: string | null;
          notes: string | null;
          starts_at: string;
          task_id: string | null;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          ends_at?: string | null;
          event_type?: string;
          id?: string;
          is_all_day?: boolean;
          metadata?: Json;
          mission_id?: string | null;
          notes?: string | null;
          starts_at: string;
          task_id?: string | null;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          ends_at?: string | null;
          event_type?: string;
          id?: string;
          is_all_day?: boolean;
          metadata?: Json;
          mission_id?: string | null;
          notes?: string | null;
          starts_at?: string;
          task_id?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendar_events_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calendar_events_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "daily_tasks";
            referencedColumns: ["id"];
          },
        ];
      };
      coach_nudges: {
        Row: {
          acted_at: string | null;
          action_taken: string | null;
          ai_run_id: string | null;
          context: Json;
          created_at: string;
          dismissed_at: string | null;
          id: string;
          message: string;
          mission_id: string | null;
          primary_action: Json | null;
          secondary_action: Json | null;
          surfaced_at: string;
          trigger_type: string;
          user_id: string;
        };
        Insert: {
          acted_at?: string | null;
          action_taken?: string | null;
          ai_run_id?: string | null;
          context?: Json;
          created_at?: string;
          dismissed_at?: string | null;
          id?: string;
          message: string;
          mission_id?: string | null;
          primary_action?: Json | null;
          secondary_action?: Json | null;
          surfaced_at?: string;
          trigger_type: string;
          user_id: string;
        };
        Update: {
          acted_at?: string | null;
          action_taken?: string | null;
          ai_run_id?: string | null;
          context?: Json;
          created_at?: string;
          dismissed_at?: string | null;
          id?: string;
          message?: string;
          mission_id?: string | null;
          primary_action?: Json | null;
          secondary_action?: Json | null;
          surfaced_at?: string;
          trigger_type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "coach_nudges_ai_run_id_fkey";
            columns: ["ai_run_id"];
            isOneToOne: false;
            referencedRelation: "ai_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coach_nudges_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
        ];
      };
      daily_tasks: {
        Row: {
          ai_run_id: string | null;
          based_on_goal: Database["public"]["Enums"]["ring_type"];
          completed: boolean;
          completed_at: string | null;
          contribution_type: Database["public"]["Enums"]["contribution_type"];
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          description: string | null;
          due_at: string | null;
          estimated_minutes: number | null;
          id: string;
          metadata: Json;
          metric_key: string | null;
          mission_id: string | null;
          priority: number;
          progress_delta: number;
          scheduled_for: string;
          sequence_no: number | null;
          skipped_at: string | null;
          source: Database["public"]["Enums"]["task_source"];
          started_at: string | null;
          status: Database["public"]["Enums"]["task_status"];
          steps: string[];
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          ai_run_id?: string | null;
          based_on_goal: Database["public"]["Enums"]["ring_type"];
          completed?: boolean;
          completed_at?: string | null;
          contribution_type?: Database["public"]["Enums"]["contribution_type"];
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          due_at?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          metadata?: Json;
          metric_key?: string | null;
          mission_id?: string | null;
          priority?: number;
          progress_delta?: number;
          scheduled_for?: string;
          sequence_no?: number | null;
          skipped_at?: string | null;
          source?: Database["public"]["Enums"]["task_source"];
          started_at?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          steps?: string[];
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          ai_run_id?: string | null;
          based_on_goal?: Database["public"]["Enums"]["ring_type"];
          completed?: boolean;
          completed_at?: string | null;
          contribution_type?: Database["public"]["Enums"]["contribution_type"];
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          due_at?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          metadata?: Json;
          metric_key?: string | null;
          mission_id?: string | null;
          priority?: number;
          progress_delta?: number;
          scheduled_for?: string;
          sequence_no?: number | null;
          skipped_at?: string | null;
          source?: Database["public"]["Enums"]["task_source"];
          started_at?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          steps?: string[];
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "daily_tasks_ai_run_id_fkey";
            columns: ["ai_run_id"];
            isOneToOne: false;
            referencedRelation: "ai_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "daily_tasks_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
        ];
      };
      debrief_responses: {
        Row: {
          answer: string;
          answer_value: number | null;
          created_at: string;
          debrief_id: string | null;
          id: string;
          mission_id: string | null;
          question: string;
          question_key: string | null;
          ring: Database["public"]["Enums"]["ring_type"];
          task_id: string | null;
          task_title: string;
          user_id: string;
        };
        Insert: {
          answer: string;
          answer_value?: number | null;
          created_at?: string;
          debrief_id?: string | null;
          id?: string;
          mission_id?: string | null;
          question: string;
          question_key?: string | null;
          ring: Database["public"]["Enums"]["ring_type"];
          task_id?: string | null;
          task_title: string;
          user_id: string;
        };
        Update: {
          answer?: string;
          answer_value?: number | null;
          created_at?: string;
          debrief_id?: string | null;
          id?: string;
          mission_id?: string | null;
          question?: string;
          question_key?: string | null;
          ring?: Database["public"]["Enums"]["ring_type"];
          task_id?: string | null;
          task_title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "debrief_responses_debrief_id_fkey";
            columns: ["debrief_id"];
            isOneToOne: false;
            referencedRelation: "task_debriefs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "debrief_responses_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "debrief_responses_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "daily_tasks";
            referencedColumns: ["id"];
          },
        ];
      };
      feature_flags: {
        Row: {
          description: string | null;
          flag_key: string;
          is_enabled: boolean;
          rollout_percent: number;
          rules: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          description?: string | null;
          flag_key: string;
          is_enabled?: boolean;
          rollout_percent?: number;
          rules?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          description?: string | null;
          flag_key?: string;
          is_enabled?: boolean;
          rollout_percent?: number;
          rules?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      file_uploads: {
        Row: {
          bucket_name: string;
          checkin_id: string | null;
          checksum_sha256: string | null;
          deleted_at: string | null;
          id: string;
          metadata: Json;
          mime_type: string | null;
          mission_id: string | null;
          original_filename: string | null;
          purpose: Database["public"]["Enums"]["upload_purpose"];
          size_bytes: number | null;
          storage_path: string;
          task_id: string | null;
          uploaded_at: string;
          user_id: string;
        };
        Insert: {
          bucket_name?: string;
          checkin_id?: string | null;
          checksum_sha256?: string | null;
          deleted_at?: string | null;
          id?: string;
          metadata?: Json;
          mime_type?: string | null;
          mission_id?: string | null;
          original_filename?: string | null;
          purpose?: Database["public"]["Enums"]["upload_purpose"];
          size_bytes?: number | null;
          storage_path: string;
          task_id?: string | null;
          uploaded_at?: string;
          user_id: string;
        };
        Update: {
          bucket_name?: string;
          checkin_id?: string | null;
          checksum_sha256?: string | null;
          deleted_at?: string | null;
          id?: string;
          metadata?: Json;
          mime_type?: string | null;
          mission_id?: string | null;
          original_filename?: string | null;
          purpose?: Database["public"]["Enums"]["upload_purpose"];
          size_bytes?: number | null;
          storage_path?: string;
          task_id?: string | null;
          uploaded_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "file_uploads_checkin_id_fkey";
            columns: ["checkin_id"];
            isOneToOne: false;
            referencedRelation: "weekly_checkins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "file_uploads_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "file_uploads_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "daily_tasks";
            referencedColumns: ["id"];
          },
        ];
      };
      mission_invites: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          expires_at: string | null;
          id: string;
          invite_token: string;
          invited_by: string;
          invitee_email: string | null;
          invitee_user_id: string | null;
          mission_id: string;
          responded_at: string | null;
          role: Database["public"]["Enums"]["membership_role"];
          status: Database["public"]["Enums"]["invite_status"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          expires_at?: string | null;
          id?: string;
          invite_token: string;
          invited_by: string;
          invitee_email?: string | null;
          invitee_user_id?: string | null;
          mission_id: string;
          responded_at?: string | null;
          role?: Database["public"]["Enums"]["membership_role"];
          status?: Database["public"]["Enums"]["invite_status"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          expires_at?: string | null;
          id?: string;
          invite_token?: string;
          invited_by?: string;
          invitee_email?: string | null;
          invitee_user_id?: string | null;
          mission_id?: string;
          responded_at?: string | null;
          role?: Database["public"]["Enums"]["membership_role"];
          status?: Database["public"]["Enums"]["invite_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mission_invites_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
        ];
      };
      mission_members: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          invited_by: string | null;
          joined_at: string;
          last_viewed_at: string | null;
          mission_id: string;
          role: Database["public"]["Enums"]["membership_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          invited_by?: string | null;
          joined_at?: string;
          last_viewed_at?: string | null;
          mission_id: string;
          role: Database["public"]["Enums"]["membership_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          invited_by?: string | null;
          joined_at?: string;
          last_viewed_at?: string | null;
          mission_id?: string;
          role?: Database["public"]["Enums"]["membership_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mission_members_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
        ];
      };
      mission_share_links: {
        Row: {
          access_role: Database["public"]["Enums"]["membership_role"];
          created_at: string;
          created_by: string;
          expires_at: string | null;
          id: string;
          max_uses: number | null;
          mission_id: string;
          revoked_at: string | null;
          share_token: string;
          use_count: number;
        };
        Insert: {
          access_role?: Database["public"]["Enums"]["membership_role"];
          created_at?: string;
          created_by: string;
          expires_at?: string | null;
          id?: string;
          max_uses?: number | null;
          mission_id: string;
          revoked_at?: string | null;
          share_token: string;
          use_count?: number;
        };
        Update: {
          access_role?: Database["public"]["Enums"]["membership_role"];
          created_at?: string;
          created_by?: string;
          expires_at?: string | null;
          id?: string;
          max_uses?: number | null;
          mission_id?: string;
          revoked_at?: string | null;
          share_token?: string;
          use_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "mission_share_links_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
        ];
      };
      mission_templates: {
        Row: {
          created_at: string;
          description: string | null;
          difficulty: string | null;
          expected_outcome: string | null;
          goal: string;
          id: string;
          is_active: boolean;
          metadata: Json;
          ring: Database["public"]["Enums"]["ring_type"];
          target: string | null;
          target_value: number | null;
          template_key: string;
          timeline_days: number | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          difficulty?: string | null;
          expected_outcome?: string | null;
          goal: string;
          id?: string;
          is_active?: boolean;
          metadata?: Json;
          ring: Database["public"]["Enums"]["ring_type"];
          target?: string | null;
          target_value?: number | null;
          template_key: string;
          timeline_days?: number | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          difficulty?: string | null;
          expected_outcome?: string | null;
          goal?: string;
          id?: string;
          is_active?: boolean;
          metadata?: Json;
          ring?: Database["public"]["Enums"]["ring_type"];
          target?: string | null;
          target_value?: number | null;
          template_key?: string;
          timeline_days?: number | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      missions: {
        Row: {
          archived_at: string | null;
          baseline_value: number | null;
          completed_at: string | null;
          created_at: string;
          created_by: string | null;
          current_progress: number;
          deadline: string;
          deleted_at: string | null;
          direction: Database["public"]["Enums"]["metric_direction"];
          goal: string;
          id: string;
          is_primary: boolean;
          metadata: Json;
          metric_key: string | null;
          metric_label: string | null;
          metric_target: number | null;
          metric_unit: string | null;
          personal_context: string | null;
          ring: Database["public"]["Enums"]["ring_type"];
          source_goal_id: string | null;
          source_scan_session_id: string | null;
          start_date: string;
          status: Database["public"]["Enums"]["mission_status"];
          summary: string | null;
          target: string;
          target_value: number | null;
          template_id: string | null;
          timeline: string;
          timeline_days: number | null;
          updated_at: string;
          user_id: string;
          visibility: Database["public"]["Enums"]["mission_visibility"];
        };
        Insert: {
          archived_at?: string | null;
          baseline_value?: number | null;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_progress?: number;
          deadline: string;
          deleted_at?: string | null;
          direction?: Database["public"]["Enums"]["metric_direction"];
          goal: string;
          id?: string;
          is_primary?: boolean;
          metadata?: Json;
          metric_key?: string | null;
          metric_label?: string | null;
          metric_target?: number | null;
          metric_unit?: string | null;
          personal_context?: string | null;
          ring: Database["public"]["Enums"]["ring_type"];
          source_goal_id?: string | null;
          source_scan_session_id?: string | null;
          start_date?: string;
          status?: Database["public"]["Enums"]["mission_status"];
          summary?: string | null;
          target: string;
          target_value?: number | null;
          template_id?: string | null;
          timeline: string;
          timeline_days?: number | null;
          updated_at?: string;
          user_id: string;
          visibility?: Database["public"]["Enums"]["mission_visibility"];
        };
        Update: {
          archived_at?: string | null;
          baseline_value?: number | null;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_progress?: number;
          deadline?: string;
          deleted_at?: string | null;
          direction?: Database["public"]["Enums"]["metric_direction"];
          goal?: string;
          id?: string;
          is_primary?: boolean;
          metadata?: Json;
          metric_key?: string | null;
          metric_label?: string | null;
          metric_target?: number | null;
          metric_unit?: string | null;
          personal_context?: string | null;
          ring?: Database["public"]["Enums"]["ring_type"];
          source_goal_id?: string | null;
          source_scan_session_id?: string | null;
          start_date?: string;
          status?: Database["public"]["Enums"]["mission_status"];
          summary?: string | null;
          target?: string;
          target_value?: number | null;
          template_id?: string | null;
          timeline?: string;
          timeline_days?: number | null;
          updated_at?: string;
          user_id?: string;
          visibility?: Database["public"]["Enums"]["mission_visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "missions_source_goal_id_fkey";
            columns: ["source_goal_id"];
            isOneToOne: false;
            referencedRelation: "user_goals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "missions_source_scan_session_id_fkey";
            columns: ["source_scan_session_id"];
            isOneToOne: false;
            referencedRelation: "scan_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "missions_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "mission_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      notification_deliveries: {
        Row: {
          attempt_count: number;
          channel: Database["public"]["Enums"]["notification_channel"];
          delivered_at: string | null;
          error_message: string | null;
          failed_at: string | null;
          id: string;
          notification_id: string;
          provider: string | null;
          provider_message_id: string | null;
          requested_at: string;
          response_payload: Json;
          sent_at: string | null;
          status: Database["public"]["Enums"]["notification_status"];
        };
        Insert: {
          attempt_count?: number;
          channel: Database["public"]["Enums"]["notification_channel"];
          delivered_at?: string | null;
          error_message?: string | null;
          failed_at?: string | null;
          id?: string;
          notification_id: string;
          provider?: string | null;
          provider_message_id?: string | null;
          requested_at?: string;
          response_payload?: Json;
          sent_at?: string | null;
          status: Database["public"]["Enums"]["notification_status"];
        };
        Update: {
          attempt_count?: number;
          channel?: Database["public"]["Enums"]["notification_channel"];
          delivered_at?: string | null;
          error_message?: string | null;
          failed_at?: string | null;
          id?: string;
          notification_id?: string;
          provider?: string | null;
          provider_message_id?: string | null;
          requested_at?: string;
          response_payload?: Json;
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["notification_status"];
        };
        Relationships: [
          {
            foreignKeyName: "notification_deliveries_notification_id_fkey";
            columns: ["notification_id"];
            isOneToOne: false;
            referencedRelation: "notifications";
            referencedColumns: ["id"];
          },
        ];
      };
      notification_preferences: {
        Row: {
          coach_nudges_enabled: boolean;
          created_at: string;
          daily_task_reminders: boolean;
          email_enabled: boolean;
          in_app_enabled: boolean;
          push_enabled: boolean;
          reminder_time: string | null;
          sms_enabled: boolean;
          timezone: string;
          updated_at: string;
          user_id: string;
          weekly_review_reminders: boolean;
        };
        Insert: {
          coach_nudges_enabled?: boolean;
          created_at?: string;
          daily_task_reminders?: boolean;
          email_enabled?: boolean;
          in_app_enabled?: boolean;
          push_enabled?: boolean;
          reminder_time?: string | null;
          sms_enabled?: boolean;
          timezone?: string;
          updated_at?: string;
          user_id: string;
          weekly_review_reminders?: boolean;
        };
        Update: {
          coach_nudges_enabled?: boolean;
          created_at?: string;
          daily_task_reminders?: boolean;
          email_enabled?: boolean;
          in_app_enabled?: boolean;
          push_enabled?: boolean;
          reminder_time?: string | null;
          sms_enabled?: boolean;
          timezone?: string;
          updated_at?: string;
          user_id?: string;
          weekly_review_reminders?: boolean;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          body: string;
          channel: Database["public"]["Enums"]["notification_channel"];
          created_at: string;
          created_by: string | null;
          data: Json;
          delivered_at: string | null;
          id: string;
          mission_id: string | null;
          read_at: string | null;
          scheduled_for: string | null;
          sent_at: string | null;
          status: Database["public"]["Enums"]["notification_status"];
          title: string;
          type: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body: string;
          channel: Database["public"]["Enums"]["notification_channel"];
          created_at?: string;
          created_by?: string | null;
          data?: Json;
          delivered_at?: string | null;
          id?: string;
          mission_id?: string | null;
          read_at?: string | null;
          scheduled_for?: string | null;
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["notification_status"];
          title: string;
          type: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          channel?: Database["public"]["Enums"]["notification_channel"];
          created_at?: string;
          created_by?: string | null;
          data?: Json;
          delivered_at?: string | null;
          id?: string;
          mission_id?: string | null;
          read_at?: string | null;
          scheduled_for?: string | null;
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["notification_status"];
          title?: string;
          type?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
        ];
      };
      onboarding_sessions: {
        Row: {
          behavioral_snapshot: Json;
          completed_at: string | null;
          converted_at: string | null;
          created_at: string;
          current_step: string | null;
          device_id: string | null;
          id: string;
          legacy_user_key: string | null;
          metadata: Json;
          profile_snapshot: Json;
          referral_code_entered: string | null;
          started_at: string;
          status: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          behavioral_snapshot?: Json;
          completed_at?: string | null;
          converted_at?: string | null;
          created_at?: string;
          current_step?: string | null;
          device_id?: string | null;
          id?: string;
          legacy_user_key?: string | null;
          metadata?: Json;
          profile_snapshot?: Json;
          referral_code_entered?: string | null;
          started_at?: string;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          behavioral_snapshot?: Json;
          completed_at?: string | null;
          converted_at?: string | null;
          created_at?: string;
          current_step?: string | null;
          device_id?: string | null;
          id?: string;
          legacy_user_key?: string | null;
          metadata?: Json;
          profile_snapshot?: Json;
          referral_code_entered?: string | null;
          started_at?: string;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "onboarding_sessions_device_id_fkey";
            columns: ["device_id"];
            isOneToOne: false;
            referencedRelation: "user_devices";
            referencedColumns: ["id"];
          },
        ];
      };
      outcome_pulses: {
        Row: {
          created_at: string;
          id: string;
          notes: string | null;
          outcome: string;
          pulse_date: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          notes?: string | null;
          outcome: string;
          pulse_date: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          notes?: string | null;
          outcome?: string;
          pulse_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      permissions: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          slug?: string;
        };
        Relationships: [];
      };
      progression_events: {
        Row: {
          id: string;
          level_after: number | null;
          metadata: Json;
          occurred_at: string;
          points_delta: number;
          reason: string | null;
          rise_score_body_delta: number;
          rise_score_money_delta: number;
          rise_score_social_delta: number;
          rise_score_total_delta: number;
          source_id: string | null;
          source_type: string;
          streak_after: number | null;
          user_id: string;
        };
        Insert: {
          id?: string;
          level_after?: number | null;
          metadata?: Json;
          occurred_at?: string;
          points_delta?: number;
          reason?: string | null;
          rise_score_body_delta?: number;
          rise_score_money_delta?: number;
          rise_score_social_delta?: number;
          rise_score_total_delta?: number;
          source_id?: string | null;
          source_type: string;
          streak_after?: number | null;
          user_id: string;
        };
        Update: {
          id?: string;
          level_after?: number | null;
          metadata?: Json;
          occurred_at?: string;
          points_delta?: number;
          reason?: string | null;
          rise_score_body_delta?: number;
          rise_score_money_delta?: number;
          rise_score_social_delta?: number;
          rise_score_total_delta?: number;
          source_id?: string | null;
          source_type?: string;
          streak_after?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      referral_codes: {
        Row: {
          code: string;
          created_at: string;
          expires_at: string | null;
          id: string;
          max_redemptions: number | null;
          metadata: Json;
          owner_user_id: string;
          redeemed_count: number;
          status: Database["public"]["Enums"]["referral_status"];
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          max_redemptions?: number | null;
          metadata?: Json;
          owner_user_id: string;
          redeemed_count?: number;
          status?: Database["public"]["Enums"]["referral_status"];
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          max_redemptions?: number | null;
          metadata?: Json;
          owner_user_id?: string;
          redeemed_count?: number;
          status?: Database["public"]["Enums"]["referral_status"];
          updated_at?: string;
        };
        Relationships: [];
      };
      referral_redemptions: {
        Row: {
          created_at: string;
          id: string;
          metadata: Json;
          onboarding_session_id: string | null;
          redeemed_by_user_id: string | null;
          referral_code_id: string;
          referred_user_id: string | null;
          reward_points: number;
          rewarded_at: string | null;
          status: Database["public"]["Enums"]["redemption_status"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          metadata?: Json;
          onboarding_session_id?: string | null;
          redeemed_by_user_id?: string | null;
          referral_code_id: string;
          referred_user_id?: string | null;
          reward_points?: number;
          rewarded_at?: string | null;
          status?: Database["public"]["Enums"]["redemption_status"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          metadata?: Json;
          onboarding_session_id?: string | null;
          redeemed_by_user_id?: string | null;
          referral_code_id?: string;
          referred_user_id?: string | null;
          reward_points?: number;
          rewarded_at?: string | null;
          status?: Database["public"]["Enums"]["redemption_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "referral_redemptions_onboarding_session_id_fkey";
            columns: ["onboarding_session_id"];
            isOneToOne: false;
            referencedRelation: "onboarding_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referral_redemptions_referral_code_id_fkey";
            columns: ["referral_code_id"];
            isOneToOne: false;
            referencedRelation: "referral_codes";
            referencedColumns: ["id"];
          },
        ];
      };
      reward_catalog: {
        Row: {
          cost_points: number;
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
          item_type: Database["public"]["Enums"]["reward_item_type"];
          metadata: Json;
          name: string;
          reward_key: string;
          updated_at: string;
        };
        Insert: {
          cost_points: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          item_type: Database["public"]["Enums"]["reward_item_type"];
          metadata?: Json;
          name: string;
          reward_key: string;
          updated_at?: string;
        };
        Update: {
          cost_points?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          item_type?: Database["public"]["Enums"]["reward_item_type"];
          metadata?: Json;
          name?: string;
          reward_key?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      role_permissions: {
        Row: {
          created_at: string;
          permission_id: string;
          role_id: string;
        };
        Insert: {
          created_at?: string;
          permission_id: string;
          role_id: string;
        };
        Update: {
          created_at?: string;
          permission_id?: string;
          role_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey";
            columns: ["permission_id"];
            isOneToOne: false;
            referencedRelation: "permissions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      scan_answers: {
        Row: {
          answer_json: Json | null;
          answer_numeric: number | null;
          answer_text: string | null;
          created_at: string;
          id: string;
          position: number | null;
          prompt: string;
          question_key: string;
          question_type: string;
          ring: Database["public"]["Enums"]["ring_type"];
          scan_session_id: string;
        };
        Insert: {
          answer_json?: Json | null;
          answer_numeric?: number | null;
          answer_text?: string | null;
          created_at?: string;
          id?: string;
          position?: number | null;
          prompt: string;
          question_key: string;
          question_type: string;
          ring: Database["public"]["Enums"]["ring_type"];
          scan_session_id: string;
        };
        Update: {
          answer_json?: Json | null;
          answer_numeric?: number | null;
          answer_text?: string | null;
          created_at?: string;
          id?: string;
          position?: number | null;
          prompt?: string;
          question_key?: string;
          question_type?: string;
          ring?: Database["public"]["Enums"]["ring_type"];
          scan_session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scan_answers_scan_session_id_fkey";
            columns: ["scan_session_id"];
            isOneToOne: false;
            referencedRelation: "scan_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      scan_results: {
        Row: {
          body_score: number;
          created_at: string;
          id: string;
          insight_explanation: string | null;
          insight_headline: string | null;
          money_score: number;
          result_payload: Json;
          scan_session_id: string;
          social_score: number;
          total_score: number;
          weakest_ring: Database["public"]["Enums"]["ring_type"] | null;
        };
        Insert: {
          body_score: number;
          created_at?: string;
          id?: string;
          insight_explanation?: string | null;
          insight_headline?: string | null;
          money_score: number;
          result_payload?: Json;
          scan_session_id: string;
          social_score: number;
          total_score: number;
          weakest_ring?: Database["public"]["Enums"]["ring_type"] | null;
        };
        Update: {
          body_score?: number;
          created_at?: string;
          id?: string;
          insight_explanation?: string | null;
          insight_headline?: string | null;
          money_score?: number;
          result_payload?: Json;
          scan_session_id?: string;
          social_score?: number;
          total_score?: number;
          weakest_ring?: Database["public"]["Enums"]["ring_type"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "scan_results_scan_session_id_fkey";
            columns: ["scan_session_id"];
            isOneToOne: true;
            referencedRelation: "scan_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      scan_sessions: {
        Row: {
          completed_at: string | null;
          created_at: string;
          id: string;
          metadata: Json;
          onboarding_session_id: string | null;
          scan_version: string;
          started_at: string;
          status: string;
          user_id: string | null;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json;
          onboarding_session_id?: string | null;
          scan_version?: string;
          started_at?: string;
          status?: string;
          user_id?: string | null;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json;
          onboarding_session_id?: string | null;
          scan_version?: string;
          started_at?: string;
          status?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "scan_sessions_onboarding_session_id_fkey";
            columns: ["onboarding_session_id"];
            isOneToOne: false;
            referencedRelation: "onboarding_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      system_settings: {
        Row: {
          description: string | null;
          is_public: boolean;
          setting_key: string;
          updated_at: string;
          updated_by: string | null;
          value: Json;
        };
        Insert: {
          description?: string | null;
          is_public?: boolean;
          setting_key: string;
          updated_at?: string;
          updated_by?: string | null;
          value?: Json;
        };
        Update: {
          description?: string | null;
          is_public?: boolean;
          setting_key?: string;
          updated_at?: string;
          updated_by?: string | null;
          value?: Json;
        };
        Relationships: [];
      };
      task_debriefs: {
        Row: {
          created_at: string;
          id: string;
          mission_id: string | null;
          score_average: number | null;
          submitted_at: string;
          summary: string | null;
          task_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          mission_id?: string | null;
          score_average?: number | null;
          submitted_at?: string;
          summary?: string | null;
          task_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          mission_id?: string | null;
          score_average?: number | null;
          submitted_at?: string;
          summary?: string | null;
          task_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "task_debriefs_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_debriefs_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: true;
            referencedRelation: "daily_tasks";
            referencedColumns: ["id"];
          },
        ];
      };
      task_steps: {
        Row: {
          completed_at: string | null;
          created_at: string;
          id: string;
          instruction: string;
          is_optional: boolean;
          step_number: number;
          task_id: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          instruction: string;
          is_optional?: boolean;
          step_number: number;
          task_id: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          instruction?: string;
          is_optional?: boolean;
          step_number?: number;
          task_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "task_steps_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "daily_tasks";
            referencedColumns: ["id"];
          },
        ];
      };
      user_devices: {
        Row: {
          app_version: string | null;
          created_at: string;
          device_label: string | null;
          id: string;
          last_seen_at: string | null;
          legacy_user_key: string | null;
          metadata: Json;
          platform: string | null;
          push_token: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          app_version?: string | null;
          created_at?: string;
          device_label?: string | null;
          id?: string;
          last_seen_at?: string | null;
          legacy_user_key?: string | null;
          metadata?: Json;
          platform?: string | null;
          push_token?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          app_version?: string | null;
          created_at?: string;
          device_label?: string | null;
          id?: string;
          last_seen_at?: string | null;
          legacy_user_key?: string | null;
          metadata?: Json;
          platform?: string | null;
          push_token?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_goals: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          goal_key: string;
          goal_label: string;
          goal_type: Database["public"]["Enums"]["goal_type"];
          id: string;
          is_active: boolean;
          metadata: Json;
          rank_order: number;
          ring: Database["public"]["Enums"]["ring_type"] | null;
          source_scan_session_id: string | null;
          target_unit: string | null;
          target_value: number | null;
          timeline_days: number | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          goal_key: string;
          goal_label: string;
          goal_type: Database["public"]["Enums"]["goal_type"];
          id?: string;
          is_active?: boolean;
          metadata?: Json;
          rank_order?: number;
          ring?: Database["public"]["Enums"]["ring_type"] | null;
          source_scan_session_id?: string | null;
          target_unit?: string | null;
          target_value?: number | null;
          timeline_days?: number | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          goal_key?: string;
          goal_label?: string;
          goal_type?: Database["public"]["Enums"]["goal_type"];
          id?: string;
          is_active?: boolean;
          metadata?: Json;
          rank_order?: number;
          ring?: Database["public"]["Enums"]["ring_type"] | null;
          source_scan_session_id?: string | null;
          target_unit?: string | null;
          target_value?: number | null;
          timeline_days?: number | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_goals_source_scan_session_id_fkey";
            columns: ["source_scan_session_id"];
            isOneToOne: false;
            referencedRelation: "scan_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      user_preferences: {
        Row: {
          coach_style: string;
          created_at: string;
          language_code: string;
          metadata: Json;
          quiet_hours: Json;
          reminder_time: string | null;
          units_system: string;
          updated_at: string;
          user_id: string;
          weekly_review_day: number | null;
        };
        Insert: {
          coach_style?: string;
          created_at?: string;
          language_code?: string;
          metadata?: Json;
          quiet_hours?: Json;
          reminder_time?: string | null;
          units_system?: string;
          updated_at?: string;
          user_id: string;
          weekly_review_day?: number | null;
        };
        Update: {
          coach_style?: string;
          created_at?: string;
          language_code?: string;
          metadata?: Json;
          quiet_hours?: Json;
          reminder_time?: string | null;
          units_system?: string;
          updated_at?: string;
          user_id?: string;
          weekly_review_day?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "user_profiles";
            referencedColumns: ["user_id"];
          },
        ];
      };
      user_profiles: {
        Row: {
          age_range: string | null;
          avatar_url: string | null;
          country_code: string | null;
          created_at: string;
          deleted_at: string | null;
          display_name: string | null;
          email: string | null;
          gender: string | null;
          last_seen_at: string | null;
          legacy_user_key: string | null;
          locale: string;
          marketing_opt_in: boolean;
          metadata: Json;
          occupation: string | null;
          onboarding_completed_at: string | null;
          revenuecat_customer_id: string | null;
          revenuecat_entitlement_id: string | null;
          relationship_status: string | null;
          subscription_ends_at: string | null;
          subscription_last_synced_at: string | null;
          subscription_plan: string | null;
          subscription_provider: string | null;
          subscription_started_at: string | null;
          subscription_status: string;
          subscription_tier: string | null;
          status: Database["public"]["Enums"]["account_status"];
          trial_ends_at: string | null;
          trial_started_at: string | null;
          trial_status: string;
          timezone: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          age_range?: string | null;
          avatar_url?: string | null;
          country_code?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          display_name?: string | null;
          email?: string | null;
          gender?: string | null;
          last_seen_at?: string | null;
          legacy_user_key?: string | null;
          locale?: string;
          marketing_opt_in?: boolean;
          metadata?: Json;
          occupation?: string | null;
          onboarding_completed_at?: string | null;
          revenuecat_customer_id?: string | null;
          revenuecat_entitlement_id?: string | null;
          relationship_status?: string | null;
          subscription_ends_at?: string | null;
          subscription_last_synced_at?: string | null;
          subscription_plan?: string | null;
          subscription_provider?: string | null;
          subscription_started_at?: string | null;
          subscription_status?: string;
          subscription_tier?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          trial_ends_at?: string | null;
          trial_started_at?: string | null;
          trial_status?: string;
          timezone?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          age_range?: string | null;
          avatar_url?: string | null;
          country_code?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          display_name?: string | null;
          email?: string | null;
          gender?: string | null;
          last_seen_at?: string | null;
          legacy_user_key?: string | null;
          locale?: string;
          marketing_opt_in?: boolean;
          metadata?: Json;
          occupation?: string | null;
          onboarding_completed_at?: string | null;
          revenuecat_customer_id?: string | null;
          revenuecat_entitlement_id?: string | null;
          relationship_status?: string | null;
          subscription_ends_at?: string | null;
          subscription_last_synced_at?: string | null;
          subscription_plan?: string | null;
          subscription_provider?: string | null;
          subscription_started_at?: string | null;
          subscription_status?: string;
          subscription_tier?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          trial_ends_at?: string | null;
          trial_started_at?: string | null;
          trial_status?: string;
          timezone?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_progression: {
        Row: {
          best_streak: number;
          created_at: string;
          current_streak: number;
          last_active_date: string | null;
          last_daily_claim_at: string | null;
          level_rank: number;
          metadata: Json;
          referral_code: string | null;
          rise_points: number;
          rise_score_body: number;
          rise_score_money: number;
          rise_score_social: number;
          rise_score_total: number;
          total_days_active: number;
          unlocked_items: string[];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          best_streak?: number;
          created_at?: string;
          current_streak?: number;
          last_active_date?: string | null;
          last_daily_claim_at?: string | null;
          level_rank?: number;
          metadata?: Json;
          referral_code?: string | null;
          rise_points?: number;
          rise_score_body?: number;
          rise_score_money?: number;
          rise_score_social?: number;
          rise_score_total?: number;
          total_days_active?: number;
          unlocked_items?: string[];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          best_streak?: number;
          created_at?: string;
          current_streak?: number;
          last_active_date?: string | null;
          last_daily_claim_at?: string | null;
          level_rank?: number;
          metadata?: Json;
          referral_code?: string | null;
          rise_points?: number;
          rise_score_body?: number;
          rise_score_money?: number;
          rise_score_social?: number;
          rise_score_total?: number;
          total_days_active?: number;
          unlocked_items?: string[];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          deleted_at: string | null;
          granted_at: string;
          granted_by: string | null;
          id: string;
          role_id: string;
          user_id: string;
        };
        Insert: {
          deleted_at?: string | null;
          granted_at?: string;
          granted_by?: string | null;
          id?: string;
          role_id: string;
          user_id: string;
        };
        Update: {
          deleted_at?: string | null;
          granted_at?: string;
          granted_by?: string | null;
          id?: string;
          role_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_unlocks: {
        Row: {
          metadata: Json;
          progression_event_id: string | null;
          reward_id: string;
          spent_points: number;
          unlocked_at: string;
          user_id: string;
        };
        Insert: {
          metadata?: Json;
          progression_event_id?: string | null;
          reward_id: string;
          spent_points?: number;
          unlocked_at?: string;
          user_id: string;
        };
        Update: {
          metadata?: Json;
          progression_event_id?: string | null;
          reward_id?: string;
          spent_points?: number;
          unlocked_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_unlocks_progression_event_id_fkey";
            columns: ["progression_event_id"];
            isOneToOne: false;
            referencedRelation: "progression_events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_unlocks_reward_id_fkey";
            columns: ["reward_id"];
            isOneToOne: false;
            referencedRelation: "reward_catalog";
            referencedColumns: ["id"];
          },
        ];
      };
      waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          metadata: Json;
          source: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          metadata?: Json;
          source?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          metadata?: Json;
          source?: string | null;
        };
        Relationships: [];
      };
      weekly_checkins: {
        Row: {
          ai_run_id: string | null;
          checkin_date: string;
          checkin_type: Database["public"]["Enums"]["checkin_type"];
          created_at: string;
          deleted_at: string | null;
          id: string;
          metric_value: number | null;
          metrics: Json;
          mission_id: string | null;
          notes: string | null;
          ring: Database["public"]["Enums"]["ring_type"];
          summary: string | null;
          updated_at: string;
          user_id: string;
          week_start: string | null;
        };
        Insert: {
          ai_run_id?: string | null;
          checkin_date?: string;
          checkin_type?: Database["public"]["Enums"]["checkin_type"];
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          metric_value?: number | null;
          metrics?: Json;
          mission_id?: string | null;
          notes?: string | null;
          ring: Database["public"]["Enums"]["ring_type"];
          summary?: string | null;
          updated_at?: string;
          user_id: string;
          week_start?: string | null;
        };
        Update: {
          ai_run_id?: string | null;
          checkin_date?: string;
          checkin_type?: Database["public"]["Enums"]["checkin_type"];
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          metric_value?: number | null;
          metrics?: Json;
          mission_id?: string | null;
          notes?: string | null;
          ring?: Database["public"]["Enums"]["ring_type"];
          summary?: string | null;
          updated_at?: string;
          user_id?: string;
          week_start?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "weekly_checkins_ai_run_id_fkey";
            columns: ["ai_run_id"];
            isOneToOne: false;
            referencedRelation: "ai_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weekly_checkins_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
        ];
      };
      weekly_reviews: {
        Row: {
          adjustment: string | null;
          ai_run_id: string | null;
          avg_debrief_score: number | null;
          body_metrics: Json | null;
          created_at: string;
          id: string;
          money_metrics: Json | null;
          social_metrics: Json | null;
          strongest_ring: Database["public"]["Enums"]["ring_type"] | null;
          tasks_completed: number;
          tasks_total: number;
          updated_at: string;
          user_id: string;
          weakest_ring: Database["public"]["Enums"]["ring_type"] | null;
          week_start: string;
          win_summary: string | null;
        };
        Insert: {
          adjustment?: string | null;
          ai_run_id?: string | null;
          avg_debrief_score?: number | null;
          body_metrics?: Json | null;
          created_at?: string;
          id?: string;
          money_metrics?: Json | null;
          social_metrics?: Json | null;
          strongest_ring?: Database["public"]["Enums"]["ring_type"] | null;
          tasks_completed?: number;
          tasks_total?: number;
          updated_at?: string;
          user_id: string;
          weakest_ring?: Database["public"]["Enums"]["ring_type"] | null;
          week_start: string;
          win_summary?: string | null;
        };
        Update: {
          adjustment?: string | null;
          ai_run_id?: string | null;
          avg_debrief_score?: number | null;
          body_metrics?: Json | null;
          created_at?: string;
          id?: string;
          money_metrics?: Json | null;
          social_metrics?: Json | null;
          strongest_ring?: Database["public"]["Enums"]["ring_type"] | null;
          tasks_completed?: number;
          tasks_total?: number;
          updated_at?: string;
          user_id?: string;
          weakest_ring?: Database["public"]["Enums"]["ring_type"] | null;
          week_start?: string;
          win_summary?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "weekly_reviews_ai_run_id_fkey";
            columns: ["ai_run_id"];
            isOneToOne: false;
            referencedRelation: "ai_runs";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: { Args: { role_slug: string }; Returns: boolean };
    };
    Enums: {
      account_status: "pending" | "active" | "suspended" | "deleted";
      ai_run_status:
        | "pending"
        | "completed"
        | "failed"
        | "rate_limited"
        | "quota_exhausted";
      ai_run_type:
        | "behavioral_analysis"
        | "scan_analysis"
        | "mission_setup_questions"
        | "mission_setup_plan"
        | "task_generation"
        | "mission_generation"
        | "coach_nudge";
      checkin_type: "baseline" | "quick" | "weekly" | "milestone";
      contribution_type: "direct_metric" | "leading_indicator";
      event_category:
        | "auth"
        | "onboarding"
        | "mission"
        | "task"
        | "checkin"
        | "progression"
        | "notification"
        | "sharing"
        | "admin"
        | "system";
      goal_type:
        | "scan_focus"
        | "short_term"
        | "long_term"
        | "mission_template"
        | "custom";
      invite_status:
        | "pending"
        | "accepted"
        | "declined"
        | "revoked"
        | "expired";
      membership_role: "owner" | "editor" | "viewer" | "coach" | "admin";
      metric_direction: "increase" | "decrease";
      mission_status:
        | "draft"
        | "active"
        | "paused"
        | "completed"
        | "expired"
        | "archived"
        | "cancelled";
      mission_visibility: "private" | "shared" | "team";
      notification_channel: "in_app" | "email" | "push" | "sms";
      notification_status:
        | "queued"
        | "sent"
        | "delivered"
        | "failed"
        | "cancelled"
        | "read";
      redemption_status: "pending" | "accepted" | "rejected" | "rewarded";
      referral_status: "active" | "inactive" | "revoked" | "expired";
      reward_item_type:
        | "feature_unlock"
        | "community_access"
        | "physical_reward"
        | "virtual_reward";
      ring_type: "money" | "body" | "social";
      task_source:
        | "scan_setup"
        | "daily_generation"
        | "manual"
        | "template"
        | "collaborator";
      task_status:
        | "pending"
        | "scheduled"
        | "in_progress"
        | "completed"
        | "skipped"
        | "cancelled"
        | "expired";
      upload_purpose:
        | "avatar"
        | "mission_proof"
        | "checkin_attachment"
        | "task_attachment"
        | "scan_attachment"
        | "general";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      account_status: ["pending", "active", "suspended", "deleted"],
      ai_run_status: [
        "pending",
        "completed",
        "failed",
        "rate_limited",
        "quota_exhausted",
      ],
      ai_run_type: [
        "behavioral_analysis",
        "scan_analysis",
        "mission_setup_questions",
        "mission_setup_plan",
        "task_generation",
        "mission_generation",
        "coach_nudge",
      ],
      checkin_type: ["baseline", "quick", "weekly", "milestone"],
      contribution_type: ["direct_metric", "leading_indicator"],
      event_category: [
        "auth",
        "onboarding",
        "mission",
        "task",
        "checkin",
        "progression",
        "notification",
        "sharing",
        "admin",
        "system",
      ],
      goal_type: [
        "scan_focus",
        "short_term",
        "long_term",
        "mission_template",
        "custom",
      ],
      invite_status: ["pending", "accepted", "declined", "revoked", "expired"],
      membership_role: ["owner", "editor", "viewer", "coach", "admin"],
      metric_direction: ["increase", "decrease"],
      mission_status: [
        "draft",
        "active",
        "paused",
        "completed",
        "expired",
        "archived",
        "cancelled",
      ],
      mission_visibility: ["private", "shared", "team"],
      notification_channel: ["in_app", "email", "push", "sms"],
      notification_status: [
        "queued",
        "sent",
        "delivered",
        "failed",
        "cancelled",
        "read",
      ],
      redemption_status: ["pending", "accepted", "rejected", "rewarded"],
      referral_status: ["active", "inactive", "revoked", "expired"],
      reward_item_type: [
        "feature_unlock",
        "community_access",
        "physical_reward",
        "virtual_reward",
      ],
      ring_type: ["money", "body", "social"],
      task_source: [
        "scan_setup",
        "daily_generation",
        "manual",
        "template",
        "collaborator",
      ],
      task_status: [
        "pending",
        "scheduled",
        "in_progress",
        "completed",
        "skipped",
        "cancelled",
        "expired",
      ],
      upload_purpose: [
        "avatar",
        "mission_proof",
        "checkin_attachment",
        "task_attachment",
        "scan_attachment",
        "general",
      ],
    },
  },
} as const;
